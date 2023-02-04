var express = require('express');
const multer = require('multer');
var router = express.Router();
var fetch = require('node-fetch');
var fs = require('fs');
var utmObj = require('utm-latlng');
var utm=new utmObj();


// global attributes
let fileURL = "database/input/"
let fileName;
let fileType


// multer storage -------------------------------------------------------------------------------------------------------
// trainingDataStorage
var trainingDataStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, fileURL);
  },
  filename: function (req, file, callback) {
    fileType = file.originalname.toString().split(".")[1];
    fileName = "train_data." + fileType;
    callback(null, fileName);
  }
});

// initalize multer
const uploadTrainingData = multer({ storage: trainingDataStorage });



//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('updateTrainData', {message: [0]});
});


// upload training data
// route to trainModel
router.post("/uploadTrainingData", function (req, res, next) {
  try {
    fs.writeFileSync("database/input/train_data.geojson", req.body.traindata);
  }
  catch (err) {
    console.log(err);
  }
  console.log("train_data written to files")
  res.render('updateTrainData', {message: [1]});
})

//route to aoa
router.post("/newaoa", function (req, res, next) {
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
        fetch("http://atlantgisbackend:8000/trainModell?algorithm=rf&type=second")
          .then((result) => {
            console.log(result)
            fetch("http://atlantgisbackend:8000/classificationAoa?xmin=" + xmin + "&xmax=" + xmax + "&ymin=" + ymin + "&ymax=" + ymax + "&type=second")
              .then(() => {
                res.render('aoa', {message: [0]});
            })
              .catch(() => {
                res.render('aoa', {message: [0]});
              });
          })
          .catch(error => {
            console.log(error);
        });
      })
    .catch(error => console.log(error))
})




module.exports = router;