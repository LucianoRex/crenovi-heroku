const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let acolhido = new Schema(
  {
    nome: {
      type: String,
    },
    nomeMae: {
      type: String,
    },
    dataNasc: {
      type: Date,
      default: "",
    },
    rg: {
      type: String,
      unique: true,
      default: "",
    },
    cpf: {
      type: String,
      unique: [true, "CPF DUPLICADO"],
      default: "",
    },
    ocupacao: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ocupacao",
    },
    telefone: {
      type: String,
    },
    religiao: {
      type: String,
    },
    acolhidoImage: {
      type: String,
    },
    endereco: {
      n: {
        type: String,
      },
      complemento: {
        type: String,
      },
      logradouro: {
        type: String,
      },
      bairro: {
        type: String,
      },
      localidade: {
        type: String,
      },
      uf: {
        type: String,
      },
      cep: {
        type: String,
      },
    },
    naturalidade: {
      uf: {
        type: String,
        default: "Nâo declarado",
      },
      municipio: {
        type: String,
        default: "Nâo declarado",
      },
    },
  },
  {
    collection: "acolhido",
  }
);

acolhido.pre("save", true, function (next, done) {
  var self = this;  
  mongoose.models["acolhido"].findOne({ cpf: self.cpf }, function (err, user) {
    if (err) {
      done(err);
    } else if (user) {
      self.invalidate("CPF", "CPF já exixte");
      done(new Error("CPF deve ser único"));
    } else {
      done();
    }
  });
  next();
});

module.exports = mongoose.model("acolhido", acolhido);
