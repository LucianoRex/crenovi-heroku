var express = require("express");
var router = express.Router();
const Medicamento = require("../models/medicamento");

/* GET users listing. */
router.get("/:skip", function (req, res, next) {
  Medicamento.find()
    .skip(parseInt(req.params.skip))
    .limit(100)
    .then((convenio) => {
      res.status(200).json(convenio);
    });
});

module.exports = router;
