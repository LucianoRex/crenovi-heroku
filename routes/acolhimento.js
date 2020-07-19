var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  chekRole,
} = require("./../utils/auth");

const Acolhimento = require("../models/acolhimento");
const Acolhido = require("../models/acolhido");

const livroDiarioController = require("../controllers/acolhimento/livroDiarioController");
const rotinaDiariaController = require("../controllers/acolhimento/rotinaDiariaController");
const normaController = require("../controllers/acolhimento/normaController");

/**Normas */

router.get("/norma", normaController.get);
router.post("/norma", normaController.post);

/**Livro diario Controller */
router.get("/livrodiario", livroDiarioController.get);
router.get("/livrodiario/:_id", livroDiarioController.getById);
router.post("/livrodiario", livroDiarioController.post);
router.put("/livrodiario/:_id", livroDiarioController.put);

/**rotins diario Controller */
router.get("/rotinadiaria", rotinaDiariaController.get);
router.get("/rotinadiaria/:_id", rotinaDiariaController.getById);
router.post("/rotinadiaria", rotinaDiariaController.post);
router.put("/rotinadiaria/:_id", rotinaDiariaController.put);

router.get("/acolhido", function (req, res, next) {
  Acolhido.find().then((acolhido) => {
    res.status(200).json(acolhido);
  });
});

module.exports = router;
