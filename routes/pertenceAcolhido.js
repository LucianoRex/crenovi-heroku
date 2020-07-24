var express = require("express");
var router = express.Router();
const PertenceAcolhido = require("../models/pertenceAcolhido");

router.get("/", function (req, res, next) {
  PertenceAcolhido.find().then((pertenceAcolhido) => {
    res.status(200).json(pertenceAcolhido);
  });
});

router.get("/:_id", function (req, res, next) {
  PertenceAcolhido.findOne({ _id: req.params._id }).then((pertenceAcolhido) => {
    res.status(200).json(pertenceAcolhido);
  });
});

router.post("/", (req, res, next) => {
  let data = {
    ...req.body,
  };
  delete data._id;
  PertenceAcolhido.create(new PertenceAcolhido(data)).then((pertenceAcolhido) => {
    res.status(200).json(pertenceAcolhido);
  });
});

router.put("/:_id", (req, res, next) => {
  let data = {
    ...req.body,
  };  
  PertenceAcolhido.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    }
  )
    .then((pertenceAcolhido) => {
      res.status(200).json(pertenceAcolhido);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:_id", (req, res, next) => {
  PertenceAcolhido.findOneAndRemove({
    _id: req.params._id,
  }).then((pertenceAcolhido) => {
    res.status(200).json(pertenceAcolhido);
  });
});

module.exports = router;
