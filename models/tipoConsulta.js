const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let tipoConsulta = new Schema(
  {
    tipo: {
      type: String,
    },
   
  },
  {
    collection: "tipoConsulta",
  }
);

module.exports = mongoose.model("tipoConsulta", tipoConsulta);
