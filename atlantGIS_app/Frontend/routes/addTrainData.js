var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  res.render('addTrainData');
});


// upload training data
// route to trainModel
router.post("/uploadTrainingData", uploadTrainingData.single("training"), function (req, res, next) {
  file = fileURL + fileName
  let extension = file.split('.').pop();
  if (extension.toLowerCase() == 'gpkg') {
    R.callMethod("../Backend/rscripts/geopackageToGeojson.R", "convertGeoPackageToGeoJson", {filename: "fileName", filepath:"../Backend/data/trainingdata/"});
  }
  res.render('trainModel');
})

module.exports = router;