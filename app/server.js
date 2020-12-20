let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

let mongoUrlLocal = "mongodb://admin:password@localhost:8001";
let mongoUrlDocker = "mongodb://admin:password@mongodb";

app.post('/update-profile', function (req, res) {
  let userObj = req.body;

  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) throw err;

    let db = client.db('carol-demo-db');
    userObj['userid'] = 1;

    let myquery = { userid: 1 };
    let newvalues = { $set: userObj };

    db.collection("my-pets").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
      if (err) throw err;
      client.close();
    });

  });

  res.send(userObj);
});

app.get('/get-profile', function (req, res) {
  let response = {};

  MongoClient.connect(mongoUrlLocal, function (err, client) {
    if (err) throw err;

    let db = client.db('carol-demo-db');

    let myquery = { userid: 1 };

    db.collection("my-pets").findOne(myquery, function (err, result) {
      if (err) throw err;
      response = result;
      client.close();

      res.send(response ? response : {});
    });
  });
});

app.listen(8000, function () {
  console.log("carol demo: app listening on port 8000!");
});
