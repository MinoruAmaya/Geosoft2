var express = require('express');
var router = express.Router();
var fs = require('fs');



//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('area', { help: [1] });
});

// route to satelliteimage if area is saved in @areaJS.js
router.post("/addData", function (req, res, next) {
  try {
    fs.writeFileSync("database/input/area.geojson", req.body.area);
  }
  catch (err) {
    console.log(err);
  }
  console.log("area written to files")
  res.render('addTrainData', { help: [2] });
})

module.exports = router;