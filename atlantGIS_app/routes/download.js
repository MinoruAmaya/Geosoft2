var express = require('express');
var router = express.Router();


//routes ---------------------------------------------------------------------------------------------------------------
router.get('/', function (req, res, next) {
    res.render('download', { title: 'Download' });
});


/**
 * download route
 * still needs to be finalized for output data
 */
router.post('/downloadData', function (req, res, next) {
    const downloadArray = Array();
    if (req.body.prediction == "on") {
        downloadArray.push({path: 'database/output/output_placeholder.txt', name: 'output_placeholder.txt'})
    } if (req.body.aoa == "on")
        downloadArray.push({path: 'database/trainingdata/trainingdata_placeholder.txt', name: 'trainingdata_placeholder.txt'})
    if (req.body.location == "on")
        downloadArray.push({path: 'database/satelliteimagery/satelliteimagery_placeholder.txt', name: 'satelliteimagery_placeholder.txt'})
    if (req.body.model == "on")
        downloadArray.push({path: 'database/model/model_placeholder.txt', name: 'model_placeholder.txt'})
    if(downloadArray.length!=0)
        res.zip(downloadArray);
    else    
        res.send("Please select files!")
});

module.exports = router;