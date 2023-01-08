var express = require('express');
const R = require('r-integration');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('demo');
});

router.get('/startDemo', function(req, res, next) {
  fetch("//localhost:4000/rscripts/trainModell").then((result) => {
    res.render('demo', message=result);
    console.log(result)
  }).catch((error) => {
    res.render('demo', message=error);
  });

})
module.exports = router;