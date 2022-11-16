var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://127.0.0.1:27017"; // connection URL
const client = new MongoClient(url, { useUnifiedTopology: true }); // mongodb client
const dbName = "mydatabase"; // database name
const collectionName = "trainData"; // collection name


//GET home page
router.get("/", function (req, res, next) {
  res.render("index", { title: "Startseite AOA" });
});


router.post("/upload_satellitenbild", function (req, res, next) {

  test = {test: "test"}

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

module.exports = router;
