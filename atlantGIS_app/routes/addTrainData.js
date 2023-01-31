var express = require('express');
const multer = require('multer');
var router = express.Router();
var fetch = require('node-fetch');
var fs = require('fs');

// global attributes
let fileURL = "database/input/"
let fileName;
let fileType;


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
  res.render('addTrainData', { help: "2" });
});


// upload training data
// route to trainModel
router.post("/uploadTrainingData", uploadTrainingData.single("training"), function (req, res, next) {
  if (fileType.toLowerCase() == 'gpkg') {
    fetch("http://atlantgisbackend:8000/gpkgToGeojson")
      .catch(error => {
        console.log(error);
      });
  }
  fs.readFile("database/input/train_data.geojson", "utf8", function (err, data) {
    // try parsing of input text
    try {
      JSON.parse(data);
    }
    catch (err) {
      res.send("Trainingsdaten konnten nicht geladen werden. Überprüfe die Syntax!");
    }

    let trainingdata = JSON.parse(data);

    trainingdata.features.forEach(element => {
      if (element.properties == null) {
        res.send("Trainingsdaten konnten nicht geladen werden. Überprüfe Properties!");
      } else if (element.properties.Label == null || element.properties.Label == "") {
        res.send("Trainingsdaten konnten nicht geladen werden. Überprüfe das Label!");
      } else if (element.properties.ClassID == null || element.properties.ClassID == "") {
        res.send("Trainingsdaten konnten nicht geladen werden. Überprüfe die ClassID!");
      } else if (element.geometry == null || element.geometry == "") {
        res.send("Trainingsdaten konnten nicht geladen werden. Keine Koordinaten vorhanden.");
      }else if (element.geometry.coordinates[0][0][0][0] != element.geometry.coordinates[0][0][element.geometry.coordinates[0][0].length-1][0] &&
                element.geometry.coordinates[0][0][0][1] != element.geometry.coordinates[0][0][element.geometry.coordinates[0][0].length-1][1]) {
        res.send("Trainingsdaten konnten nicht geladen werden. Überprüfe die Koordinaten!");
      }
      console.log(element + " checked")
    })
    res.render('trainModel', { help: "2" });
  });
})


module.exports = router;