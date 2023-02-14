var express = require('express');
var router = express.Router();
const multer = require('multer');
var fetch = require('node-fetch');

// multer storage -------------------------------------------------------------------------------------------------------
// satelliteImageStorage
var satelliteImageStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "database/input/");
  },
  filename: function (request, file, callback) {
    fileName = "satelliteimage.tif";
    callback(null, fileName);
  }
});

// initalize multer
const uploadSatelliteImage = multer({ storage: satelliteImageStorage });


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('satelliteimage', {help: [0]});
});


// Upload satelliteimagery
// Route to addTrainData
router.post("/uploadSatelliteimage", uploadSatelliteImage.single("satellitenbild"), function (req, res, next) {
      res.render('area', {help: [1]});
})




module.exports = router;
