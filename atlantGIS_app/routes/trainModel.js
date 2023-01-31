var express = require('express');
const multer = require('multer');
var router = express.Router();
var fetch = require('node-fetch');




// multer storage -------------------------------------------------------------------------------------------------------
// ModellStorage
var modellStorage = multer.diskStorage({
  destination: function (request, file, callback) {
      callback(null, "database/input/");
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
  res.render('trainModel', {help: [1]});
});


// Upload trained model
// route to aoa
router.post("/uploadTrainModell", uploadModell.single("trainMod"), function (req, res, next) {
  fetch("http://atlantgisbackend:8000/classificationAoa?xmin=111111&xmax=222222ymin=3333333ymax=44444444&type=normal")
      .then((result) => {
        console.log(result)
        res.render('aoa');
      })
      .catch(error => {
        console.log(error);
      });
})

// model has to be trained
// route to trainData
router.post("/uploadUntrainModell", function (req, res, next) {
  fetch("http://atlantgisbackend:8000/trainModell?algorithm=rf&type=normal")
      .then((result) => {
        console.log(result)
        fetch("http://atlantgisbackend:8000/classificationAoa?xmin=111111&xmax=222222ymin=3333333ymax=44444444&type=normal")
          .then(() => {
            res.render('aoa');
        })
          .catch(() => {
            res.render('aoa');
          });
      })
      .catch(error => {
        console.log(error);
      });
})


module.exports = router;