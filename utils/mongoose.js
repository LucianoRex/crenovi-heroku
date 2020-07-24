const mongoose = require('mongoose');
const config = require("../utils/config").config;


module.exports = function () {
    mongoose.connect(config.DB_URL.url, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false });

    const db = mongoose.connect(config.DB_URL.url, /*dbOptions*/{
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
        () => {
            //console.log('Conectado ao banco de dados')
            // require('../models/acolhido')
            //require('../models/medicamento')
            //require('../models/conceito')
           //  require('../models/convenio')
            return db
        }
    );
    mongoose.connection.on('connected', function () {
        //console.log('Mongoose default connection open to ' + config.DB_URL.url);
    });
    mongoose.connection.on('error', function (err) {
       // console.log('Mongoose default connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
      //  console.log('Mongoose default connection disconnected');
    });
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
          //  console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}