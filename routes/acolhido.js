const Acolhido = require("../models/acolhido");
const Prontuario = require("../models/prontuario");
var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  Acolhido.find().then((acolhido) => {
    res.status(200).json(acolhido);
  });
});

router.get("/:_id", async (req, res, next) => {
  try {
    await Acolhido.findOne({ _id: req.params._id })
      .populate("ocupacao")
      .then((acolhido) => {
        res.status(200).json(acolhido);
      });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

router.put("/:_id", async (req, res, next) => {
  console.log("AtualizandoAcolhido");
  let data = {
    ...req.body.acolhido,
  };
  //console.log(req.body);
  let mensagem = [];
  /* let conferecpf = await Acolhido.find({
    $and: [{ _id: { $ne: req.params._id } }, { cpf: req.body.acolhido.cpf }],
  });*/
  // console.log("CONFERECPF" + conferecpf);

  Acolhido.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    },
    {
      upsert: true,
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

router.delete("/:_id", (req, res, next) => {
  let data = {
    ...req.body.acolhido,
  };

  /* Acolhido.findOneAndRemove({ _id: req.params._id })
    .then((acolhido) => {
      res.status(200).json(acolhido);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });*/
});

module.exports = router;
