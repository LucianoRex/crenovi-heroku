const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let colaborador = new Schema(
  {
    nome: {
      type: String,
    },
    cpf: {
      type: String,
    },
    telefone: {
      type: String,
    },
    email: {
      type: String,
    },
    funcao:{
      type:String
    }
  },
  {
    collection: "colaborador",
  }
);
module.exports = mongoose.model("colaborador", colaborador);
