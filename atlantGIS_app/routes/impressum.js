var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('impressum', { title: 'Impressum' });
});

module.exports = router;