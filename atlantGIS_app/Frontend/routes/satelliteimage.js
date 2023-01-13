var express = require('express');
var router = express.Router();
let fetch = require('node-fetch');
let FormData = require('form-data');
let formidable = require('formidable');

//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('satelliteimage');
});

/*
//Route muss an dieser Stelle nochmal überarbeitet werden.
//Nutzt man den code ab z.38 funktioniert es noch nicht.
router.post("/uploadSatelliteimage", function (req, res, next) {
  res.render('addTrainData');
})
*/



// upload satellite imagery
// route to trainData
router.post("/uploadSatelliteimage", function (req, res, next) {
  const formData = FormData();
  console.log(req.body.satellitenbildOne);
  formData.append("file", req.body.satellitenbildOne);
  fetch("http://backend:4000/upload/uploadSatelliteimage", {
    method: 'POST',
    body: formData,
  })
    .then(res => {
      console.log(res.statusText)
    })
    .then(res.render('addTrainData'))
    .catch((err) => ("Error occured", err));
})


module.exports = router;
