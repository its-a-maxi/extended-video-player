const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200",
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.listen(8000, () => {
    console.log("Server started!");
})

app.route('/api/bookmarks').get((req, res) => {
    res.send({
        bookmarks: [{ videoURL:"B19_G1guNDk" }, { videoURL: "gset79KMmt0" }]
    })
})

app.route('/api/bookmarks/:videoURL').get((req, res) => {
    const requestedVideoURL = req.params['videoURL']
    res.send({ name: requestedVideoURL })
  })

app.route('/api/bookmarks').post((req, res) => {
  res.send(201, req.body)
})

app.route('/api/bookmarks/:videoURL').put((req, res) => {
    res.send(200, req.body)
})

app.route('/api/bookmarks/:videoURL').delete((req, res) => {
    res.sendStatus(204)
})