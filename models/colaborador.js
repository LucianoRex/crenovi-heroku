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
    funcao: {
      type: String,
    },
  },
  {
    collection: "colaborador",
  }
);
colaborador.set('toObject', { virtuals: true }) 
colaborador.virtual('id').get(function(){
  return this._id.toHexString();
});

colaborador.set('toJSON', {
  virtuals: true
});
module.exports = mongoose.model("colaborador", colaborador);
