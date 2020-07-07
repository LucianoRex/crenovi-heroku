const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let procedimentoPsicologico = new Schema(
  {
    procedimento: {
      type: String,
    },
  },
  {
    collection: "procedimentoPsicologico",
  }
);

module.exports = mongoose.model(
  "procedimentoPsicologico",
  procedimentoPsicologico
);
