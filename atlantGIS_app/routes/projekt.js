var express = require("express");
var router = express.Router();


//routes ---------------------------------------------------------------------------------------------------------------
router.get("/", function (req, res, next) {
  res.render("projekt", { title: "Über das Projekt" });
});


module.exports = router;