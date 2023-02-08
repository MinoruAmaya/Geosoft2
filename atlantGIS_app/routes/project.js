var express = require("express");
var router = express.Router();


//routes ---------------------------------------------------------------------------------------------------------------
router.get("/", function (req, res, next) {
  res.render("project", { title: "Über das Projekt" });
});


module.exports = router;