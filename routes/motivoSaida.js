var express = require("express");
var router = express.Router();
const MotivoSaida = require("../models/motivoSaida");

router.get("/", function (req, res, next) {
  MotivoSaida.find().then((motivoSaida) => {
    res.status(200).json(motivoSaida);
  });
});

router.get("/:_id", function (req, res, next) {
  MotivoSaida.findOne({ _id: req.params._id }).then((motivoSaida) => {
    res.status(200).json(motivoSaida);
  });
});

router.post("/", (req, res, next) => {
  let data = {
    ...req.body,
  };
  delete data._id;
  MotivoSaida.create(new MotivoSaida(data)).then((motivoSaida) => {
    res.status(200).json(motivoSaida);
  });
});

router.put("/:_id", (req, res, next) => {
  let data = {
    ...req.body,
  };
  console.log(req.body);
  MotivoSaida.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    }
  )
    .then((motivoSaida) => {
      res.status(200).json(motivoSaida);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:_id", (req, res, next) => {
  MotivoSaida.findOneAndRemove({
    _id: req.params._id,
  }).then((motivoSaida) => {
    res.status(200).json(motivoSaida);
  });
});

module.exports = router;
