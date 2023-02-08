var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var zip = require('express-zip');


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
  res.render('aoa');
});

// route to createTrainData to train more data for model
router.get("/updateTrainData", function (req, res, next) {
  res.render('updateTrainData');
})


/**
* download route
* still needs to be finalized for output data
*/
router.post('/downloadData', function (req, res, next) {
  const downloadArray = Array();
  if (req.body.prediction == "on") {
    downloadArray.push({ path: 'database/output/classification.tif', name: 'classification.tif' })
    downloadArray.push({ path: 'database/output/classification.tif.aux.xml', name: 'classification.tif.aux.xml' })
  } if (req.body.aoa == "on") {
    downloadArray.push({ path: 'database/output/AOA.tif', name: 'AOA.tif' })
  } if (req.body.location == "on") {
    downloadArray.push({ path: 'database/output/DI.geojson', name: 'DI.geojson' })
  } if (req.body.model == "on") {
    downloadArray.push({ path: 'database/output/model.RDS', name: 'model.RDS' })
  } if (req.body.traindata == "on") {
    downloadArray.push({ path: 'database/input/train_data.geojson', name: 'train_data.geojson' })
  } if (downloadArray.length != 0) {
    res.zip(downloadArray);
  } else {
    res.send("Please select files!")
  }
});



module.exports = router;