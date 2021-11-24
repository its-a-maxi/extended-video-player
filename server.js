
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require('mongodb').MongoClient

const app = express();

var corsOptions = {
    origin: "http://localhost:4200",
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Connects to Atlas mongoDB database
MongoClient.connect('mongodb+srv://root:Password@cluster0.cdajx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (err, client) => {
    if (err)
        return (console.error(err));
    
    console.log('Connected to the Database');

    const db = client.db('videoPlayerDB');
    const historyCollection = db.collection('history')
    const bookmarksCollection = db.collection('bookmarks')

    app.listen(8000, () => {
        console.log("Server started in port " + 8000 + "!");
    })

    // CRUD FOR BOOKMARKS

    // The DB collection for bookmarks is returned
    app.route('/bookmarks').get((req, res) => {
        bookmarksCollection.find().toArray()
        .then(results => {
            console.log(results)
            res.send(results)
        })
        .catch(error => console.error(error))
    })

    // A new bookmark is added to the DB
    app.route('/bookmarks').post((req, res) => {
        bookmarksCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    })

    // All the bookmarks are removed from the database
    app.route('/bookmarks').delete((req, res) => {
        bookmarksCollection.deleteMany({})
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    })

    // The provided bookmark is removed from the database
    app.route('/bookmarks/:videoURL').delete((req, res) => {
        const requestedVideoURL = {videoURL : req.params['videoURL']}
        bookmarksCollection.deleteOne(requestedVideoURL)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    })


    // CRUD FOR HISTORY

    // The DB collection for history is returned
    app.route('/history').get((req, res) => {
        historyCollection.find().toArray()
        .then(results => {
            console.log(results)
            res.send(results)
        })
        .catch(error => console.error(error))
    })

    // A new history entry is added to the DB
    app.route('/history').post((req, res) => {
        const requestedVideoURL = {videoURL : req.body.videoURL}
        historyCollection.deleteOne(requestedVideoURL)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
        historyCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    })

    // The history is removed from the database
    app.route('/history').delete((req, res) => {
        historyCollection.deleteMany({})
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    })

    // The provided video is removed from the history
    app.route('/history/:videoURL').delete((req, res) => {
        const requestedVideoURL = {videoURL : req.params['videoURL']}
        historyCollection.deleteOne(requestedVideoURL)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    })
  })

  