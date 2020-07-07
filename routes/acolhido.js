const Acolhido = require("../models/acolhido");
var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  Acolhido.find().then((acolhido) => {
    res.status(200).json(acolhido);
  });
});

router.get("/:_id", (req, res, next) => {
  Acolhido.findOne({ _id: req.params._id })
    .populate("ocupacao")
    .then((acolhido) => {
      res.status(200).json(acolhido);
    });
});

router.put("/:_id", (req, res, next) => {
  console.log("AtualizandoAcolhido");
  let data = {
    ...req.body.acolhido,
  };
  console.log(req.params);
  let mensagem = [];
  Acolhido.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    },
    {
      // new: true,
      //upsert: true,
    }
  )
    .then((acolhido) => {
      res.status(200).json(acolhido);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post("/", (req, res, next) => {
  let data = {
    ...req.body.acolhido,
  };
  delete data._id;
  let mensagem = [];
  Acolhido.create(new Acolhido(data))
    .then((acolhido) => {
      res.status(200).json(acolhido);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
