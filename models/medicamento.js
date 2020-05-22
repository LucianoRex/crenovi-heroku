var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let medicamento = new Schema(
  {
    "PRINCIPIO ATIVO": {
      type: String,
      trim: true,
      default: null,
      required: true,
      alias: "Principio Ativo",
    },
    PRODUTO: {
      type: String,
      alias: "Produto",
    },
    APRESENTACAO: {
      type: String,
      alias: "Apresentação",
    },
  },
  {
    collection: "medicamento",
  }
);

module.exports = mongoose.model("medicamento", medicamento);
