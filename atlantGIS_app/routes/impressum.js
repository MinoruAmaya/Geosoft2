var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('impressum', { title: 'Hier wird die analyse Seite entstehen wo die Ergebnisse visualisiert werden und die Daten gedownlaoded werden können' });
});

module.exports = router;