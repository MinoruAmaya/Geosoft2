var express = require('express');
var router = express.Router();
const fs = require('fs');
const zip = require('express-zip')


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function(req, res, next) {
  res.render('aoa');
});

// route to createTrainData to train more data for model
router.post("/updateTrainData", function (req, res, next) {
  res.render('createTrainData');
})

// route to aoa to calculate it again
router.post("/classification", function (req, res, next) {
  /**
  not tested
  fetch("http://backend:4000/aoa");
   */
  res.render('aoa');
})



/**
* download route
* still needs to be finalized for output data
*/
router.post('/downloadData', function (req, res, next) {
  const downloadArray = Array();
  if (req.body.prediction == "on") {
      downloadArray.push({path: 'database/output/output_placeholder.txt', name: 'output_placeholder.txt'})
  } if (req.body.aoa == "on") 
      downloadArray.push({path: 'database/input/trainingdata_placeholder.txt', name: 'trainingdata_placeholder.txt'})
  if (req.body.location == "on")
      downloadArray.push({path: 'database/input/satelliteimagery_placeholder.txt', name: 'satelliteimagery_placeholder.txt'})
  if (req.body.model == "on")
      downloadArray.push({path: 'database/input/model_placeholder.txt', name: 'model_placeholder.txt'})
  if(downloadArray.length!=0)
      res.zip(downloadArray);
  else    
      res.send("Please select files!")
});



module.exports = router;