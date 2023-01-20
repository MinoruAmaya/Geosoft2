var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


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
  fetch("http://atlantgisbackend:8000/classificationAoa")
      .then(response => {
        console.log(response.text());
      })
      .catch(error => {
        console.log(error);
      });
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
      downloadArray.push({path: 'database/output/classification.tif', name: 'classification.tif'})
  } if (req.body.aoa == "on") 
      downloadArray.push({path: 'database/input/area_of_applicability.tif', name: 'area_of_applicability.tif'})
  if (req.body.location == "on")
      downloadArray.push({path: 'database/input/satelliteimagery_placeholder.txt', name: 'satelliteimagery_placeholder.txt'})
  if (req.body.model == "on")
      downloadArray.push({path: 'database/input/model.RDS', name: 'model.RDS'})
  if(downloadArray.length!=0)
      res.zip(downloadArray);
  else    
      res.send("Please select files!")
});



module.exports = router;