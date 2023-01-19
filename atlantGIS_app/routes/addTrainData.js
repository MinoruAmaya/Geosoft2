var express = require('express');
const multer = require('multer');
var router = express.Router();

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
    fileName = "trainingdata." + fileType;
    callback(null, fileName);
  }
});

// initalize multer
const uploadTrainingData = multer({ storage: trainingDataStorage });



//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('createTrainData');
});


// upload training data
// route to trainModel
// fetch not testet so not working ---------
router.post("/uploadTrainingData", uploadTrainingData.single("training"), function (req, res, next) {
  if (fileType.toLowerCase() == 'gpkg') {
    console.log("gpkgToGeoJSON")
    fetch("http://http://127.0.0.1:8000/gpkgToGeojson");
  }
  res.render('createTrainData');
})

//route to aoa
router.post("/newaoa", function (req, res, next) {
  /**
  not tested
  fetch("http://http://127.0.0.1:8000/classificationAoa");
   */
  res.render('aoa');
})

module.exports = router;