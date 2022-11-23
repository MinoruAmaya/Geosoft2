var express = require("express");
var router = express.Router();

const fs = require("fs");
const R = require('r-integration');
const Jimp = require('jimp')


var bodyParser = require('body-parser')
var rawParser = bodyParser.raw({ type: 'image/tif' })

//GET home page
router.get("/", function (req, res, next) {
  res.render("index", { title: "Startseite" });
});


router.post("/upload_satellitenbild", function (req, res, next) {


  const satellitenbild = Jimp.read('req.body.satellitenbild')
    .then(satellitenbild => {
      console.log(satellitenbild)
      return satellitenbild
    })
    .catch(err => {
      console.error(err);
    });



  /**
  fs.createReadStream(test).
   pipe(bucket.openUploadStreamWithId(req.body.satellitenbild, req.body.satellitenbild, {
       chunkSizeBytes: 1048576,
       metadata: { field: 'myField', value: 'myValue' }
   }));
   res.render("notification", { title: "Satelitenbild hinzugefügt", data: JSON.stringify(test) });
  // connect to the mongodb database and afterwards, insert one the new element
  */

  res.render("workflow_train", { title: "Satelitenbild hinzugefügt", data: JSON.stringify(test) });
});



router.post("/upload_training", function (req, res, next) {

  test = { test: "test" }

  fs.readFile(req.body.training, "utf-8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });
  res.render("workflow_train", { title: "Satelitenbild hinzugefügt", data: JSON.stringify(test) });
})


router.post("/calculate_AOA", function (req, res, next) {
  let a = req.body.testR
  let result = R.callMethod("./public/rscripts/test.R", "x", { data: a });
  res.render("notification", { title: result });
});

module.exports = router;
