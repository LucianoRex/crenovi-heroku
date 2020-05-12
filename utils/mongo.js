var mongodb = require('mongodb');
var express = require('express');
var app = express();
var db;
module.exports = function () {
    mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inbradis', function (err, client) {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        db = client.db();
        console.log('Database connection ready');

        // Initialize the app.
        //var server = 
    });
}