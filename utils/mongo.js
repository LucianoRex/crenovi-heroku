var mongodb = require('mongodb');
var express = require('express');
var app = express();
var db;
module.exports = function () {
    mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inbradis', function (err, client) {
        if (err) {            
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        db = client.db();        

        // Initialize the app.
        //var server = 
    });
}