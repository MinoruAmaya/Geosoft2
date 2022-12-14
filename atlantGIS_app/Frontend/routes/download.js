var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('download', { title: 'Download' });
});

router.post('/downloadData', function (req, res, next) {
    if (req.body.prediction=="on") {
        res.download('../Backend/data/output/output_placeholder.txt', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }if(req.body.aoa=="on") {
        res.download('../Backend/data/output/output_placeholder.txt', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }if(req.body.location=="on") {
        res.download('../Backend/data/output/output_placeholder.txt', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }if(req.body.model=="on"){
        res.download('../Backend/data/output/output_placeholder.txt', function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    res.render('download', { title: 'Download' });
});

module.exports = router;