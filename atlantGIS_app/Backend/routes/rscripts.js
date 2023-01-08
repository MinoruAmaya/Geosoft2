var express = require('express');
const R = require('r-integration');
var router = express.Router();

router.get('/trainModell', function(req, res, next) {
    R.executeRScript("./database/rscripts/trainModell.R").then((result) => {
      return result;
    }).catch((error) => {
      return error;
    });
  
  })

  module.exports = router;