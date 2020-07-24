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
      type: mongoose.Schema.Types.ObjectId,
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
  mongoose.models["acolhido"].findOne(
    { $or: [{ cpf: self.cpf }, { rg: self.rg }] },
    function (err, user) {
      if (err) {
        done(err);
      } else if (user) {
        self.invalidate("CPF", "CPF já existe");
        done(new Error("CPF ou RG já está cadastrado"));
      } else {
        done();
      }
    }
  );

  next();
});
/*acolhido.pre("findOneAndUpdate", function (next, done, error) {
  var self = this;
console.log(this.getUpdate())
  mongoose.models["acolhido"].findOne(
    {
      $and: [
        { _id: { $ne: self._update.$set._id } },
        { cpf: self._update.$set.cpf },
      ],
    },
    function (err, user) {
      if (err) {
        console.log("errororr");
        done();
      } else if (user) {
        

        done(new Error("CPF ou RG já está cadastrado"));
      } else {
        done();
      }
    }
  );
  next();
});
*/
module.exports = mongoose.model("acolhido", acolhido);
