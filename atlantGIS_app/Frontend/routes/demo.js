var express = require('express');
const R = require('r-integration');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('demo');
});

router.get('/trainModel', function(req, res, next) {
  R.executeRScript("../backend/rscripts/trainModell.R").then((result) => {
    res.render('demo', message=result);
  }).catch((error) => {
    res.render('demo', message=error);
  });

})
module.exports = router;