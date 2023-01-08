var express = require('express');
const multer = require('multer');
var router = express.Router();


// multer storage -------------------------------------------------------------------------------------------------------
// ModellStorage
let fileURL = "./public/data/trainingdata/"
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


router.get('/', function (req, res, next) {
  res.render('trainData');
});


// upload training data
// route to area
router.post("/uploadTrainingData", uploadTrainingData.single("training"), function (req, res, next) {
  file = fileURL + fileName
  let extension = file.split('.').pop();
  if (extension.toLowerCase() == 'gpkg') {
    R.callMethod("../Backend/rscripts/geopackageToGeojson.R", "convertGeoPackageToGeoJson", {filename: "fileName", filepath:"../Backend/data/trainingdata/"});
  }
  res.render('trainModel');
})

module.exports = router;