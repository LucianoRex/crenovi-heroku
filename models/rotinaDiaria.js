const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let rotinaDiaria = new Schema(
  {
    horarioInicial: {
      type: String,
    },
    horarioFinal: {
      type: String,
    },
    diaSemana: {
      type: [String],
    },
    atividade:{
        type:String
    }
  },
  {
    collection: "rotinaDiaria",
  }
);

module.exports = mongoose.model("rotinaDiaria", rotinaDiaria);
