const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema(
  {
    nome: {
      type: String,
      //     required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
  },
  {
    collection: "user",
  }
);
module.exports = mongoose.model("user", user);
