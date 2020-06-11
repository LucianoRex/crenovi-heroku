var express = require("express");
var router = express.Router();

const RotinaDiaria = require("../models/rotinaDiaria");

router.get("/", function (req, res, next) {
  RotinaDiaria.find().then((rotinaDiaria) => {
    res.status(200).json(rotinaDiaria);
  });
});

router.get("/:_id", function (req, res, next) {
  RotinaDiaria.findOne({ _id: req.params._id }).then((rotinaDiaria) => {
    res.status(200).json(rotinaDiaria);
  });
});

router.post("/", (req, res, next) => {
  let data = {
    ...req.body,
  };
  delete data._id;
  RotinaDiaria.create(new RotinaDiaria(data)).then((rotinaDiaria) => {
    res.status(200).json(rotinaDiaria);
  });
});

router.put("/:_id", (req, res, next) => {
  let data = {
    ...req.body,
  };
  RotinaDiaria.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    }
  )
    .then((rotinaDiaria) => {
      res.status(200).json(rotinaDiaria);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:_id", (req, res, next) => {
  RotinaDiaria.findOneAndRemove({
    _id: req.params._id,
  }).then((rotinaDiaria) => {
    res.status(200).json(rotinaDiaria);
  });
});
module.exports = router;
