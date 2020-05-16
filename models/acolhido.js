const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let acolhido = new Schema({
    nome: {
        type: String,     
    },   
},
    {
        collection: 'acolhido'
    }

);
module.exports = mongoose.model('acolhido', acolhido);