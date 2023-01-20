var express = require('express');
var router = express.Router();
let fetch = require('node-fetch');


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('demo');
});

router.get('/startDemo', function(req, res, next) {
  fetch("http://atlantgisbackend:8000/trainModell").then((result) => {
    res.render('demo', message=result);
    console.log(result)
  }).catch((error) => {
    res.render('demo', message=error);
  });

})

module.exports = router;