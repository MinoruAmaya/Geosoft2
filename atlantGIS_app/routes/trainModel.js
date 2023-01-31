var express = require('express');
const multer = require('multer');
var router = express.Router();
var fetch = require('node-fetch');
var utmObj = require('utm-latlng');
var utm=new utmObj();



// multer storage -------------------------------------------------------------------------------------------------------
// ModellStorage
var modellStorage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, "database/output/");
  },
  filename: function (request, file, callback) {
      fileName="model.RDS";
      callback(null, fileName);
  }
});

// initalize multer
const uploadModell = multer({storage:modellStorage});



//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('trainModel', {help: [1]});
});


// Upload trained model
// route to aoa
router.post("/uploadTrainModell", uploadModell.single("trainMod"), function (req, res, next) {
  var xmin = 0;
  var xmax = 0;
  var ymin = 0;
  var ymax = 0;
  fetch("http://localhost:3000/input/area.geojson")
    .then(result => result.json())
      .then(data => {
        var coords = data.geometry.coordinates[0];
        xmin = coords[0][1];
        xmax = coords[0][1];
        ymin = coords[0][0];
        ymax = coords[0][0];
        coords.forEach(feat => {
          if(feat[0] < ymin){
            ymin = feat[0]
          }
          else if(feat[0] > ymax){
            ymax = feat[0]
          }
          if(feat[1] < xmin){
            xmin = feat[1]
          }
          else if(feat[1] > xmax){
            xmax = feat[1]
          }
        });
        var mins = utm.convertLatLngToUtm(xmin, ymin, 1);
        var maxs = utm.convertLatLngToUtm(xmax, ymax, 1);
        xmin = Math.round(mins.Easting);
        ymin = Math.round(mins.Northing);
        xmax = Math.round(maxs.Easting);
        ymax = Math.round(maxs.Northing);
        fetch("http://atlantgisbackend:8000/classificationAoa?xmin=" + xmin + "&xmax=" + xmax + "&ymin=" + ymin + "&ymax=" + ymax + "&type=normal")
          .then((result) => {
            console.log(result)
            res.render('aoa', {message: [1]});
          })
          .catch(error => {
            console.log(error);
          });
      })
    .catch(error => console.log(error))
})

// model has to be trained
// route to trainData
router.post("/uploadUntrainModell", function (req, res, next) {
  var xmin = 0;
  var xmax = 0;
  var ymin = 0;
  var ymax = 0;
  fetch("http://localhost:3000/input/area.geojson")
    .then(result => result.json())
      .then(data => {
        var coords = data.geometry.coordinates[0];
        xmin = coords[0][1];
        xmax = coords[0][1];
        ymin = coords[0][0];
        ymax = coords[0][0];
        coords.forEach(feat => {
          if(feat[0] < ymin){
            ymin = feat[0]
          }
          else if(feat[0] > ymax){
            ymax = feat[0]
          }
          if(feat[1] < xmin){
            xmin = feat[1]
          }
          else if(feat[1] > xmax){
            xmax = feat[1]
          }
        });
        var mins = utm.convertLatLngToUtm(xmin, ymin, 1);
        var maxs = utm.convertLatLngToUtm(xmax, ymax, 1);
        xmin = Math.round(mins.Easting);
        ymin = Math.round(mins.Northing);
        xmax = Math.round(maxs.Easting);
        ymax = Math.round(maxs.Northing);
        fetch("http://atlantgisbackend:8000/trainModell?algorithm=rf&type=normal")
          .then((result) => {
            console.log(result)
            fetch("http://atlantgisbackend:8000/classificationAoa?xmin=111111&xmax=222222ymin=3333333ymax=44444444&type=normal")
              .then(() => {
                res.render('aoa', {message: [1]});
            })
              .catch(() => {
                res.render('aoa', {message: [1]});
              });
          })
          .catch(error => {
            console.log(error);
        });
      })
    .catch(error => console.log(error))
})


module.exports = router;