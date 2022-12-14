var express = require('express');
const multer = require('multer');
var router = express.Router();




// multer storage -------------------------------------------------------------------------------------------------------
// ModellStorage
var modellStorage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, "./Backend/data/model/");
  },
  filename: function (request, file, callback) {
      fileName="model.RDS";
      callback(null, fileName);
  }
});

// initalize multer
const uploadModell = multer({storage:modellStorage});



//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('trainModel');
});


// satellite imagery and trained model
// route to aoa
router.post("/uploadTrainModell", uploadModell.single("trainMod"), function (req, res, next) {
  res.render('aoa');
})

// satellite imagery and untrained model
// route to trainData
router.post("/uploadUntrainModell", function (req, res, next) {
  res.render('trainData');
})


module.exports = router;