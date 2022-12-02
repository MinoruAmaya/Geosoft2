var express = require('express');
var router = express.Router();

const multer = require('multer')

var satelliteImageStorage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, "./public/data/satelliteimagery/");
  },
  filename: function (request, file, callback) {
      fileName="satelliteimage.tif";
      callback(null, file.originalname);
  }
});

var ModellStorage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, "./public/data/modell/");
  },
  filename: function (request, file, callback) {
      fileName="model.RDS";
      callback(null, file.originalname);
  }
});

const uploadSatelliteImage = multer({storage:satelliteImageStorage})
const uploadModell = multer({storage:ModellStorage})


router.get('/', function (req, res, next) {
  res.render('workflow');
});


router.post("/uploadSatelliteimageTrainModell", function (req, res, next) {
  uploadSatelliteImage.single("satellitenbild")
  uploadModell.single("trainModell")

  res.render('area');
})

router.post("/uploadSatelliteimageUntrainModell", function (req, res, next) {
  uploadSatelliteImage.single("satellitenbild")

  res.render('trainData');
})


module.exports = router;