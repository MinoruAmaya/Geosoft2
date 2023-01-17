var express = require('express');
var router = express.Router();


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('area');
});

// route to satelliteimage if area is saved in @areaJS.js
router.post("/addSatelliteimage", function (req, res, next) {
  res.render('satelliteimage');
})

module.exports = router;