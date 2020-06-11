const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let norma = new Schema(
  {
    texto: {
      type: String,
    },
   
  },
  {
    collection: "norma",
  }
);

module.exports = mongoose.model("norma", norma);
