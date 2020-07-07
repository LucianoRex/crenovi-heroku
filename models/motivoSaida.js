const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let motivoSaida = new Schema(
  {
    motivo: {
      type: String,
    },
   
  },
  {
    collection: "motivoSaida",
  }
);

module.exports = mongoose.model("motivoSaida", motivoSaida);
