const express = require('express');
const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser  
const app = express();
const port = 3000;
var cors = require('cors')
var testRoutes = require('./hotmeasurements');


var myRoutes = require('./hotmeasurements');

app.use('/', myRoutes); //register the routes

app.use(cors())

// Connection URL for MongoDB
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'ShivajiCreationDb';

// Define an async function to connect to MongoDB
async function connectToMongo() {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Define your routes and interact with MongoDB here

    // Example route: Get all documents from a collection

    app.get('/aa', async (req, res) => {
      try {
        const collection = db.collection('appAccounts');
        const users = await collection.find().toArray();
        res.json(users);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        res.status(500).send('Internal Server Error');
      }
    });

    app.post('/', async (req, res) => {

      let data = req.body;
      console.log(data)
      db.collection('appAccounts').findOne({ 'username': data.username, 'password': data.password })
        .then(function (doc) {

          if (doc == null) {
            res.send(null);
          }
          else {
            res.send(data)
          }
          console.log(doc);
        });

    })


    // Start the Express.js server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

// Call the connectToMongo function to establish the MongoDB connection
connectToMongo();