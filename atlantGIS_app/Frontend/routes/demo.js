var express = require('express');
const R = require('r-integration');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('demo');
});

router.get('/trainModell', function(req, res, next) {
  /*R.executeRScript("http://localhost:4000/demo/trainModell").then((result) => {
    res.render('demo', message=result);
  }).catch((error) => {
    res.render('demo', message=error);
  });*/

})
module.exports = router;