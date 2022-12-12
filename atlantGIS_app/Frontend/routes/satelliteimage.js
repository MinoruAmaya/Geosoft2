var express = require('express');
const multer = require('multer');
var router = express.Router();




// multer storage -------------------------------------------------------------------------------------------------------
// satelliteImageStorage
var satelliteImageStorage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, "../Backend/data/satelliteimagery/");
  },
  filename: function (request, file, callback) {
      fileName="satelliteimage.tif";
      callback(null, file.originalname);
  }
});


// initalize multer
const uploadSatelliteImage = multer({storage:satelliteImageStorage});


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
    res.render('satelliteimage');
  });
  
  
  // satellite imagery and trained model
  // route to area
  router.post("/uploadSatelliteimage", uploadSatelliteImage.single("satellitenbildOne"), function (req, res, next) {
    res.render('model');
  })


module.exports = router;
