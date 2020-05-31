var express = require("express");
var router = express.Router();
//const Medicamento = require("../models/medicamento");

router.post("/:model", (req, res, next) => {
  let model = req.params.model;
  let campo = req.body.campo;
  let comparador = req.body.comparador;
  let valor = req.body.valor;

  if (comparador == "like") {
    var criteria = {
      [campo]: new RegExp(valor, "i"),
    };
  } else if (comparador == "=") {
    var criteria = {
      [campo]: new String(valor).toUpperCase(),
    };
  }

  const Model = require(`../models/${req.params.model}`);
 
  Model.find(criteria).then((result) => {      
    res.status(200).json(result);
  });
});

router.get("/getFields", async function (req, res, next) {
  try {
    const Model = require(`../models/${req.query.model}`);
    const data = await new Promise((resolve, reject) => {
      resolve(Model.schema.aliases);
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json("Modelo não encontrado");
  }
});

module.exports = router;
