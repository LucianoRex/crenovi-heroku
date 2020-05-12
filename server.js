var express = require("express");
var bodyParser = require("body-parser");
var server2 = require('http').createServer(app);
var io = require('socket.io')(server2);
const cors = require('cors');
require('./utils/mongoose')();

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

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

function handleError(res, reason, message, code) {
    console.log('ERROR: ' + reason);
    res.status(code || 500).json({ 'error': message });
}

app.use('/convenio', convenioRouter);

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));





