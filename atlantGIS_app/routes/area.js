var express = require('express');
var router = express.Router();
var fs = require('fs');
const multer = require('multer');

// global attributes
let fileURL = "database/input/"
let fileName;
let fileType;


// multer storage -------------------------------------------------------------------------------------------------------
// areaStorage
var areaStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, fileURL);
  },
  filename: function (req, file, callback) {
    fileType = file.originalname.toString().split(".")[1];
    fileName = "area." + fileType;
    callback(null, fileName);
  }
});

// initalize multer
const uploadArea = multer({ storage: areaStorage });


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('area', { help: [1] });
});


// route to area if area was uploaded via file upload
router.post("/addArea", uploadArea.single("in_areaFile"), function (req, res, next) {
  if (fileType.toLowerCase() == 'gpkg') {
    fetch("http://atlantgisbackend:8000/gpkgToGeojson")
      .then(() => {
        validateArea(res);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    validateArea(res);
  }
})


// route to satelliteimage if area is digitalize in leaflet and is saved in @areaJS.js
router.post("/addData", function (req, res, next) {
  try {
    fs.writeFileSync("database/input/area.geojson", req.body.in_area);
  }
  catch (err) {
    console.log(err);
  }
  console.log("area written to files")
  res.render('addTrainData', { help: [2] });
})

/**
 * valdidate area.geojson file 
 * @param {*} req 
 * @param {*} res 
 */
function validateArea(res) {
  fs.readFile("database/input/area.geojson", "utf8", function (err, data) {
    // try parsing of input text
    try {
      JSON.parse(data);
    }
    catch (err) {
      res.send("Area konnte nicht geladen werden. Überprüfe die Syntax!");
    }

    let area = JSON.parse(data);
    if (area.type == "FeatureCollection") {
      res.send("Es wird nur ein Feature benötigt");
    } else if (area.geometry == null || area.geometry == "") {
      res.send("Area konnte nicht geladen werden. Keine Koordinaten vorhanden.");
    } else if (area.geometry.coordinates[0][0][0] != area.geometry.coordinates[0][area.geometry.coordinates[0].length - 1][0] ||
      area.geometry.coordinates[0][0][1] != area.geometry.coordinates[0][area.geometry.coordinates[0].length - 1][1]) {
      res.send("Area konnte nicht geladen werden. Überprüfe die Koordinaten!");
    } else {
      res.render('addTrainData', { help: [2] });
    }
  })
}

module.exports = router;