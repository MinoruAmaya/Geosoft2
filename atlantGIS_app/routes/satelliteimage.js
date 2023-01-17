var express = require('express');
var router = express.Router();
let multer = require('multer');

// multer storage -------------------------------------------------------------------------------------------------------
// satelliteImageStorage
var satelliteImageStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "../database/data/satelliteimagery/");
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


//Route muss an dieser Stelle nochmal überarbeitet werden.
//Nutzt man den code ab z.38 funktioniert es noch nicht.
router.post("/uploadSatelliteimage", uploadSatelliteImage.single("satellitenbildOne"), function (req, res, next) {
  res.render('addTrainData');
})




module.exports = router;
