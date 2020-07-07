var express = require("express");
var router = express.Router();
const procedimentoPSicologico = require("../models/procedimentoPsicologico");

router.get("/", function (req, res, next) {
  procedimentoPSicologico.find().then((procedimentoPsicologico) => {
    res.status(200).json(procedimentoPsicologico);
  });
});

router.get("/:_id", function (req, res, next) {
  procedimentoPSicologico
    .findOne({ _id: req.params._id })
    .then((procedimentoPsicologico) => {
      res.status(200).json(procedimentoPsicologico);
    });
});

router.post("/", (req, res, next) => {
  let data = {
    ...req.body,
  };
  delete data._id;
  procedimentoPSicologico
    .create(new procedimentoPSicologico(data))
    .then((procedimentoPsicologico) => {
      res.status(200).json(procedimentoPsicologico);
    });
});

router.put("/:_id", (req, res, next) => {
  let data = {
    ...req.body,
  };
  console.log(req.body);
  procedimentoPSicologico
    .findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        $set: data,
      }
    )
    .then((procedimentoPsicologico) => {
      //   io.emit("livrodiario", { data: res });
      res.status(200).json(procedimentoPsicologico);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:_id", (req, res, next) => {
  procedimentoPSicologico
    .findOneAndRemove({
      _id: req.params._id,
    })
    .then((procedimentoPsicologico) => {
      res.status(200).json(procedimentoPsicologico);
    });
});

module.exports = router;
