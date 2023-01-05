var express = require('express');
const multer = require('multer');
var router = express.Router();
//import fetch from 'node-fetch'
//const fetch = require('node-fetch');




// multer storage -------------------------------------------------------------------------------------------------------
// satelliteImageStorage
var satelliteImageStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "backend:4000/usr/src/app/database/data/satelliteimagery/");
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

/**
router.post("/uploadSatelliteimage", uploadSatelliteImage.single("satellitenbildOne"), function (req, res, next) {
  res.render('model');
})
*/

// upload satellite imagery
// route to model
router.post("/uploadSatelliteimage", function (req, res, next) {
  const response = fetch("http://backend:4000/upload/satelliteimage", {
    method: "POST",
    body: satellitenbild,
  })
  .catch((err) => ("Error occured", err))
  .then(res.render('model'));
})


module.exports = router;
