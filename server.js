var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var server2 = require('http').createServer(app);
var io = require('socket.io')(server2);
const cors = require('cors');
const path = require('path');
//require('./utils/mongoose')();

server2.listen(4000);

io.on('connection', function (socket) {
    socket.on('updatedata', function (data) {
        io.emit('update-data', { data: data });
    });
});

const convenioRouter = require('./routes/convenio');
var app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors({
    'origin': '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}


var http = require ('http');         // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/crenovi';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

function handleError(res, reason, message, code) {
    console.log('ERROR: ' + reason);
    res.status(code || 500).json({ 'error': message });
}


app.use('/convenio', convenioRouter);

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));





