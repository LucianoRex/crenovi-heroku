const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let pertenceAcolhido = new Schema(
  {
    pertence: {
      type: String,
    },
  },
  {
    collection: "pertenceAcolhido",
  }
);
module.exports = mongoose.model("pertenceAcolhido", pertenceAcolhido);
