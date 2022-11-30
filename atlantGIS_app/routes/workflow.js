var express = require('express');
var router = express.Router();

const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, "./public/data/satelliteimage/");
  },
  filename: function (request, file, callback) {
      fileName=file.originalname;
      callback(null, file.originalname);
  }
});

const uploadDest = multer({storage:storage})


router.get('/', function (req, res, next) {
  res.render('workflow');
});


router.post("/uploadSatelliteimage", uploadDest.single("satellitenbild"), function (req, res, next) {
  console.log(req.file);
  console.log(req.body);

  res.render('workflow');
})


module.exports = router;