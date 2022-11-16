let express = require('express');
let router = express.Router();

const { MongoClient } = require('mongodb');
// or as an es module:
//import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient('mongodb://localhost:27017');

// Database Name
const dbName = 'myProject';
const collectionName = "trainData";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

 /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('download', { title: 'Express' });
});

module.exports = router;