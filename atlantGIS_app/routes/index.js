var express = require("express");
var router = express.Router();

const fs = require("fs");
const R = require('r-integration');

const multer = require('multer')


//multer
var satelliteImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    // Uploads is the Upload_folder_name
    cb(null, "./public/data/satelliteimage")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".tif")
  }
})

var trainingdataStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    // Uploads is the Upload_folder_name
    cb(null, "./public/data/trainingdata")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".tif")
  }
})



var uploadSatelliteImage = multer({
  storage: satelliteImageStorage,
  limits: { fileSize: 1000000000 },
  fileFilter: function (req, file, cb) {

    console.log("test");

    // Set the filetypes, it is optional
    var filetypes = /tif/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(
      file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("Error: File upload only supports the "
      + "following filetypes - " + filetypes);
  }

  // mypic is the name of file attribute
}).single("req.body.satellitenbild");




//GET home page
router.get("/", function (req, res, next) {
  res.render("index", { title: "Startseite" });
});


router.post("/upload_satellitenbild", function (req, res, next) {
  // Error MiddleWare for multer file upload, so if any
  // error occurs, the image would not be uploaded!
  uploadSatelliteImage(req, res, function (err) {

    if (err) {

      // ERROR occurred (here it can be occurred due
      // to uploading image of size greater than
      // 1MB or uploading different file type)
      res.send(err)
    }
    else {

      // SUCCESS, image successfully uploaded
      res.render("workflow_sat", { title: "Satelitenbild hinzugefügt"});
    }
  })
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
