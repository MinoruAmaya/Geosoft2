var express = require('express');
var router = express.Router();
let fetch = require('node-fetch');

//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('satelliteimage');
});

/*Route muss an dieser Stelle nochmal überarbeitet werden.
Nutzt man den code ab z.38 funktioniert es noch nicht.
router.post("/uploadSatelliteimage", uploadSatelliteImage.single("satellitenbildOne"), function (req, res, next) {
  res.render('addTrainData');
})
*/


// upload satellite imagery
// route to trainData
router.get("/uploadSatelliteimage", function (req, res, next) {
  fetch("//localhost:4000/upload/uploadSatelliteimage", {
    method: 'POST',
    body: satellitenbildOne,
  })
  .catch((err) => ("Error occured", err))
  .then(res.render('addTrainData'));
})


module.exports = router;
