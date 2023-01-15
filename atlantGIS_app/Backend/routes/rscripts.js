var express = require('express');
const R = require('r-integration');
var router = express.Router();

router.get('/trainModell', function(req, res, next) {
    R.callMethod("./database/rscripts/trainModell.R", "trainModell", {area: "Enschede", algorithm: "rf"}).then((result) => {
      console.log(result);
      res.render('index', { title: resut });
    }).catch((error) => {
      console.log(error);
    });
  
  })

  module.exports = router;