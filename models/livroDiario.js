const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let livroDiario = new Schema(
  {
    anotacoes: {
      type: String,
    },

    data: {
      type: Date,
      default: Date.now(),
      unique: true,
    },
  },
  {
    collection: "livroDiario",
  }
);

livroDiario.pre("save", true, function (next, done) {
  var self = this;  
  mongoose.models["livroDiario"].findOne({ data: self.data }, function (
    err,
    user
  ) {
    if (err) {
      done(err);
    } else if (user) {     
      done(new Error("Um Livro por dia"));
    } else {
      done();
    }
  });
  next();
});

module.exports = mongoose.model("livroDiario", livroDiario);
