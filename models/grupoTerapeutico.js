const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let grupoTerapeutico = new Schema(
  {
    nome: {
      type: String,
    },
    responsavel: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "colaborador",
    },
  },
  {
    collection: "grupoTerapeutico",
  }
);
module.exports = mongoose.model("grupoTerapeutico", grupoTerapeutico);
