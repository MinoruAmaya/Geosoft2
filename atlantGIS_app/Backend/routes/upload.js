var express = require('express');
const multer = require('multer');
var router = express.Router();




// multer storage -------------------------------------------------------------------------------------------------------
// satelliteImageStorage
var satelliteImageStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "database/data/satelliteimagery/");
  },
  filename: function (request, file, callback) {
    fileName = "satelliteimage.tif";
    callback(null, fileName);
  }
});

// TrainingdataStorage
let fileURL = "database/data/trainingdata/"
var trainingDataStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, fileURL);
  },
  filename: function (request, file, callback) {
    fileName = "trainingdata" + file.Type;
    callback(null, fileName);
  }
});

// ModellStorage
var modellStorage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, "database/data/model/");
  },
  filename: function (request, file, callback) {
      fileName="model.RDS";
      callback(null, fileName);
  }
});


// initalize multer
const uploadSatelliteImage = multer({ storage: satelliteImageStorage });

const uploadTrainingData = multer({ storage: trainingDataStorage });

const uploadModell = multer({storage:modellStorage});

//routes ---------------------------------------------------------------------------------------------------------------


// upload satellite imagery
router.post("/uploadSatelliteimage", uploadSatelliteImage.single("daten"), function (req, res, next) {
    console.log("test")
    res.send( "done" );
})

// upload training data
router.post("/uploadTrainingData", uploadTrainingData.single("daten"), function (req, res, next) {
  file = fileURL + fileName
  let extension = file.split('.').pop();
  if (extension.toLowerCase() == 'gpkg') {
    R.callMethod("database/rscripts/geopackageToGeojson.R", "convertGeoPackageToGeoJson", {filename: "fileName", filepath:"database/data/trainingdata/"});
  }
  res.send( "done" );
})

// satellite imagery and trained model
// route to area
router.post("/uploadTrainModell", uploadModell.single("daten"), function (req, res, next) {
  res.send( "done" );
})


module.exports = router;