var express = require('express');
var router = express.Router();
var multer = require('multer');


// multer storage -------------------------------------------------------------------------------------------------------
// trainingDataStorage
let fileURL = "./database/data/trainingdata/"
var trainingDataStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, fileURL);
  },
  filename: function (request, file, callback) {
    fileName = "trainingdata" + file.Type;
    callback(null, fileName);
  }
});

// initalize multer
const uploadTrainingData = multer({ storage: trainingDataStorage });



//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('addTrainData');
});


// upload training data
// route to trainModel
// fetch not testet so not working ---------
router.post("/uploadTrainingData", uploadTrainingData.single("training"), function (req, res, next) {
  file = fileURL + fileName
  let extension = file.split('.').pop();
  if (extension.toLowerCase() == 'gpkg') {
    fetch("http://backend:4000/geopackageToGeoJSON");
  }
  res.render('trainModel');
})



module.exports = router;