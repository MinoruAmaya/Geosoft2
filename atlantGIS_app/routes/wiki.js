var express = require('express');
var router = express.Router();



//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('wiki');
});

module.exports = router;