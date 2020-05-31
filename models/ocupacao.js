const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ocupacao = new Schema(
  {
    CODIGO: {
      type: String,
    },
    TITULO: {
      type: String,
    },
  },
  {
    collection: "ocupacao",
  }
);
module.exports = mongoose.model("ocupacao", ocupacao);
