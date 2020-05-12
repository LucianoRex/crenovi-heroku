const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let convenio = new Schema({
    convenio: {
        type: String,
        uppercase: true
    },   
},
    {
        collection: 'convenio'
    }

);
module.exports = mongoose.model('convenio', convenio);