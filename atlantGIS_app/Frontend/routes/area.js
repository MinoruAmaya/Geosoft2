var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('area');
});

router.post("/addSatelliteimage", function (req, res, next) {
  res.render('satelliteimage');
})

module.exports = router;