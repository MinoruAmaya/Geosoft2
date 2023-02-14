var express = require('express');
var router = express.Router();
let fetch = require('node-fetch');


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('demo', message=["normal"]);
});

// route to demo_ergebnisse
// calculate the model, classification and aoa
router.get('/startAnalyse', function(req, res, next) {
  fetch("http://atlantgisbackend:8000/trainModell?algorithm=rf&type=demo")
    .then((result) => {
      console.log(result)
      fetch("http://atlantgisbackend:8000/classificationAoa?xmin=414882&xmax=417989&ymin=5756370&ymax=5760354&type=demo")
        .then(() => {
          res.render('demo_ergebnisse', message=["ergebnisse"]);
      })
        .catch(() => {
          res.render('demo_ergebnisse', message=["ergebnisse"]);
        });
  })
    .catch((error) => {
      console.log(error)
    });
})

// route to demo_ergebnisse
router.get('/ergebnisse', function(req, res, next){
  res.render('demo_ergebnisse', message=["normal"])
})

module.exports = router;