var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let substancia = new Schema(
  {
    nome: {
      type: String,
      alias: "Nome",
    },
  },
  {
    collection: "substancia",
  }
);

module.exports = mongoose.model("substancia", substancia);
