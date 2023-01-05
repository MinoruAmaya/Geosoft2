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


// initalize multer
const uploadSatelliteImage = multer({ storage: satelliteImageStorage });


//routes ---------------------------------------------------------------------------------------------------------------


// upload satellite imagery
// route to model
router.post("/uploadSatelliteimage", uploadSatelliteImage.single("daten"), function (req, res, next) {
    console.log("test")
    res.send( "done" );
})


module.exports = router;