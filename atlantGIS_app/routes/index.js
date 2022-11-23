var express = require("express");
var router = express.Router();

const fs = require("fs");
const R = require('r-integration');

//GET home page
router.get("/", function (req, res, next) {
  res.render("index", { title: "Startseite" });
});


router.post("/upload_satellitenbild", function (req, res, next) {


  

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
