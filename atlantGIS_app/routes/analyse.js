var express = require('express');
const R = require('r-integration');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('analyse');
});

router.get('/aoa', function(req, res, next) {
  R.executeRScript("./rscripts/AreaofApplicability.R").then((result) => {
    res.render('analyse', message=result);
  }).catch((error) => {
    res.render('analyse', message=error);
  });

})

module.exports = router;