var express = require("express");
var router = express.Router();
const LivroDiario = require("../models/livroDiario");

router.get("/", function (req, res, next) {
  LivroDiario.find().then((livroDiario) => {
    res.status(200).json(livroDiario);
  });
});

router.get("/:_id", function (req, res, next) {
  LivroDiario.findOne({ _id: req.params._id }).then((livroDiario) => {
    res.status(200).json(livroDiario);
  });
});

router.post("/", (req, res, next) => {
  let data = {
    ...req.body,
  };
  delete data._id;
  LivroDiario.create(new LivroDiario(data)).then((livroDiario) => {   
    res.status(200).json(livroDiario);
  });
});

router.put("/:_id", (req, res, next) => {
  let data = {
    ...req.body,
  };
  console.log(req.body)
  LivroDiario.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    }
  )
    .then((livroDiario) => {
     
   //   io.emit("livrodiario", { data: res });
      res.status(200).json(livroDiario);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:_id", (req, res, next) => {
  LivroDiario.findOneAndRemove({
    _id: req.params._id,
  }).then((livroDiario) => {
    res.status(200).json(livroDiario);
  });
});

module.exports = router;
