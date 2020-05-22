var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let doenca = new Schema(
  {
    codigo: {
      trim: true,
      default: null,
    //  required: true,
      type: String,
      alias: "Código",
    },
    nome: {
      type: String,
      alias: "Nome",
    },
  },
  {
    collection: "doenca",
  }
);

module.exports = mongoose.model("doenca", doenca);
