const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Connection URL for MongoDB
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Cinema';
const collectionName = "account";


router.route('/')

    .post(async function (req, res) {
        try {
            // Connect to the MongoDB server
         const client = new MongoClient(url);
         await client.connect();
 
         // Get a reference to the database
         const db = client.db(dbName);
 
         // Get a reference to the newBook collection
         const collection = db.collection(collectionName);
 
         // Extract newBook data from the request
         const { movieId, image, description, dateAdded, movieTrailer } = req.body;
        // Create a new book object from the form data
        const newMovie = {
            movieId: req.body.movieId,
            image: req.body.image,
            description: req.body.description,
            dateAdded: new Date(req.body.dateAdded),
            movieTrailer: req.body.movieTrailer,
        };

         // Insert the newBook into the collection
         await collection.insertOne(newMovie);
    
         // Close the database connection
         client.close();
 
         res.status(200).json({message: 'created successfully'});
            
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send('An error occurred while registering the parts.');
        }
       
    });

module.exports = router;
