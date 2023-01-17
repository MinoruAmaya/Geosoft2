var express = require('express');
var router = express.Router();
let multer = require('multer');

// multer storage -------------------------------------------------------------------------------------------------------
// satelliteImageStorage
var satelliteImageStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./database/data/input/");
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
  res.render('satelliteimage');
});


// Upload satelliteimagery
// Route to addTrainData
router.post("/uploadSatelliteimage", uploadSatelliteImage.single("satellitenbild"), function (req, res, next) {
  res.render('addTrainData');
})




module.exports = router;
