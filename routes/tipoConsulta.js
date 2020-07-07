var express = require("express");
var router = express.Router();
const TipoConsulta = require("../models/tipoConsulta");

router.get("/", function (req, res, next) {
  TipoConsulta.find().then((tipoConsulta) => {
    res.status(200).json(tipoConsulta);
  });
});

router.get("/:_id", function (req, res, next) {
  TipoConsulta.findOne({ _id: req.params._id }).then((tipoConsulta) => {
    res.status(200).json(tipoConsulta);
  });
});

router.post("/", (req, res, next) => {
  let data = {
    ...req.body,
  };
  delete data._id;
  TipoConsulta.create(new TipoConsulta(data)).then((tipoConsulta) => {
    res.status(200).json(tipoConsulta);
  });
});

router.put("/:_id", (req, res, next) => {
  let data = {
    ...req.body,
  };
  console.log(req.body);
  TipoConsulta.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    }
  )
    .then((tipoConsulta) => {
      res.status(200).json(tipoConsulta);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:_id", (req, res, next) => {
  TipoConsulta.findOneAndRemove({
    _id: req.params._id,
  }).then((tipoConsulta) => {
    res.status(200).json(tipoConsulta);
  });
});

module.exports = router;
