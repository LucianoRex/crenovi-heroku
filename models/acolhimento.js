const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let acolhimento = new Schema(
  {
    identificacao: {
      dataIngresso: {
        type: String,
        default: "01-01-01",
      },
      dataEgresso: {
        type: String,
      },
      encaminhado: {
        type: String,
      },
      periodo: {
        type: String,
      },
      convenio: {
        type: String,
      },
     /* acolhido: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "acolhido",
      },
      */
    },
  },
  {
    collection: "acolhimento",
  }
);
module.exports = mongoose.model("acolhimento", acolhimento);
