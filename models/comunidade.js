const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let comunidade = new Schema(
  {
    cnpj: {
      type: String,
    },
    fundacao: {
      type: Date,
      default: Date.now(),
    },
    razaoSocial: {
      type: String,
    },
    localizacao: {
      type: String,
    },
    responsavelTecnico: {
      type: String,
    },
    correspondencia: {
      rua: {
        type: String,
      },
      numero: {
        type: String,
      },
      bairro: {
        type: String,
      },
      cidade: {
        type: String,
      },
      uf: {
        type: String,
      },
      cep: {
        type: String,
      },
    },
  },
  {
    collection: "comunidade",
  }
);

module.exports = mongoose.model("comunidade", comunidade);
