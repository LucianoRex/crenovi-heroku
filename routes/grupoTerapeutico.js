var express = require("express");
var router = express.Router();
const grupoTerapeutico = require("../models/grupoTerapeutico");

/* GET users listing. */
router.get("/", function (req, res, next) {
  grupoTerapeutico.find().then((grupoTerapeutico) => {
    res.status(200).json(grupoTerapeutico);
  });
});

router.get("/:_id", function (req, res, next) {
  grupoTerapeutico.findOne({ _id: req.params._id }).then((grupoTerapeutico) => {
    res.status(200).json(grupoTerapeutico);
  });
});

router.post("/", (req, res, next) => {
  let data = {
    ...req.body,
  };
  delete data._id;
  grupoTerapeutico
    .create(new grupoTerapeutico(data))
    .then((grupoTerapeutico) => {
      res.status(200).json(grupoTerapeutico);
    });
});

router.put("/:_id", (req, res, next) => {
  let data = {
    ...req.body,
  };

  grupoTerapeutico
    .findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        $set: data,
      }
    )
    .then((grupoTerapeutico) => {
      res.status(200).json(grupoTerapeutico);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:_id", (req, res, next) => {
  grupoTerapeutico
    .findOneAndRemove({
      _id: req.params._id,
    })
    .then((grupoTerapeutico) => {
      res.status(200).json(grupoTerapeutico);
    });
});
module.exports = router;
