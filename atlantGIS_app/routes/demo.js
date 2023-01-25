var express = require('express');
var router = express.Router();
let fetch = require('node-fetch');


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('demo');
});

router.get('/startDemo', function(req, res, next) {
  fetch("http://127.0.0.1:8000/classificationAoa").then((result) => {
    res.render('demo', message=result);
    console.log(result)
  }).catch((error) => {
    res.render('demo', message=error);
  });

})

module.exports = router;