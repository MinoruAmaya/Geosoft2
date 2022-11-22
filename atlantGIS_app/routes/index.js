var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
var mongodb = require('mongodb');

const fs = require("fs");
const R = require('r-integration');

const url = "mongodb://127.0.0.1:27017"; // connection URL
const client = new MongoClient(url, { useUnifiedTopology: true }); // mongodb client
const dbName = "mydatabase"; // database name
const collectionName = "trainData"; // collection name
const db = client.db(dbName);
var bucket = new mongodb.GridFSBucket(db, { bucketName: 'TrainDataBucket' });
//const bucket = new mongodb.GridFSBucket(db, { bucketName: 'DataBucket' });

//GET home page
router.get("/", function (req, res, next) {
  res.render("index", { title: "Startseite" });
});


router.post("/upload_satellitenbild", function (req, res, next) {

    console.log(req.body.satellitenbild);
    test = { test: "test" }
  	
    /**
    fs.readFile(req.body.satellitenbild, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });

    
    fs.createReadStream(test).
     pipe(bucket.openUploadStreamWithId(req.body.satellitenbild, req.body.satellitenbild, {
         chunkSizeBytes: 1048576,
         metadata: { field: 'myField', value: 'myValue' }
     }));
     res.render("notification", { title: "Satelitenbild hinzugefügt", data: JSON.stringify(test) });
    // connect to the mongodb database and afterwards, insert one the new element
    */

    
    client.connect(function (err) {

      console.log("Connected successfully to server");

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      // Insert the document in the database
      collection.insertOne(test, function (err, result) {
        console.log(
          `Inserted ${result.insertedCount} document into the collection`);
        res.render("notification", { title: "Satelitenbild hinzugefügt", data: JSON.stringify(test) });
      });
    });
})



router.post("/upload_training", function (req, res, next) {

  test = { test: "test" }

  // connect to the mongodb database and afterwards, insert one the new element
  client.connect(function (err) {

    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the document in the database
    collection.insertOne(test, function (err, result) {
      console.log(
        `Inserted ${result.insertedCount} document into the collection`);
      res.render("notification", { title: "Satelitenbild hinzugefügt", data: JSON.stringify(test) });
    });
  });
})


router.post("/calculate_AOA", function (req, res, next) {
  let a = req.body.testR
  let result = R.callMethod("./public/rscripts/test.R", "x", {data: a});
  res.render("notification", { title: result });
});

module.exports = router;
