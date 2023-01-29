var express = require('express');
const multer = require('multer');
var router = express.Router();
var fetch = require('node-fetch');

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
  res.render('updateTrainData');
});


// upload training data
// route to trainModel
// fetch not testet so not working ---------
router.post("/uploadTrainingData", uploadTrainingData.single("training"), function (req, res, next) {
  if (fileType.toLowerCase() == 'gpkg') {
    fetch("http://atlantgisbackend:8000/gpkgToGeojson")
      .then(response => {
        console.log(response.text());
      })
      .catch(error => {
        console.log(error);
      });
  }
  res.render('trainModel');
})

//route to aoa
router.post("/newaoa", function (req, res, next) {
  /**
  not tested
  fetch("http://atlantgisbackend:8000/classificationAoa")
      .then(response => {
        console.log(response.text());
      })
      .catch(error => {
        console.log(error);
      });
   */
  res.render('aoa');
})




module.exports = router;