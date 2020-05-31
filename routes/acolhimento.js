var express = require("express");
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
const identificacaoController = require("../controllers/acolhimento/pas/identificacaoController");
const responsavelController = require("../controllers/acolhimento/pas/responsavelController");
const pasController = require("../controllers/acolhimento/pas/pasController");
const medicamentoController = require("../controllers/acolhimento/pas/medicamentoController");
const historicoPsiquicoController = require("../controllers/acolhimento/pas/historicoPsiquicoController");
const historicoFamiliarSocialController = require("../controllers/acolhimento/pas/historicoFamiliarSocialController");
const historicoForenseController = require("../controllers/acolhimento/pas/historicoForenseController");
const doencaController = require("../controllers/acolhimento/pas/doencaController");
const saidaController = require("../controllers/acolhimento/pas/saidaController");
const biometriaController = require("../controllers/acolhimento/pas/biometriaController");
const tratamentoController = require("../controllers/acolhimento/pas/tratamentoController");
const quadroClinicoController = require("../controllers/acolhimento/pas/quadroClinicoController");
const historicoQuimicoController = require("../controllers/acolhimento/pas/historicoQuimicoController");
const acolhidoController = require("../controllers/acolhimento/pas/acolhidoController");
const pertenceController = require("../controllers/acolhimento/pas/pertenceController");
const avaliacaoController = require("../controllers/acolhimento/pas/avaliacaoController");

const livroDiarioController = require("../controllers/acolhimento/livroDiarioController");

/**Livro diario Controller */
router.get("/livrodiario", livroDiarioController.get);
router.get("/livrodiario/:_id", livroDiarioController.getById);
router.post("/livrodiario", livroDiarioController.post);
router.put("/livrodiario/:_id", livroDiarioController.put);

router.get("/acolhido", function (req, res, next) {
  Acolhido.find().then((acolhido) => {
    res.status(200).json(acolhido);
  });
});

router.get("/", pasController.get);

router.get("/:_id", pasController.getById);

router.delete("/:_id", (req, res, next) => {
  Acolhimento.findOneAndRemove({
    _id: req.params._id,
  }).then((acolhimento) => {
    res.status(200).json(acolhimento);
  });
});

/**Responsavel */
router.get("/:_id/responsavel", responsavelController.get);
router.put("/:_id/responsavel", responsavelController.put);

/** Identificacao*/
router.post("/identificacao", identificacaoController.post);
router.get("/:_id/identificacao", identificacaoController.get);
router.put(
  "/:_id/identificacao",
  userAuth,
  // chekRole(["admin"]),
  identificacaoController.put
);

/**HistPsiquico*/
router.get("/:_id/historicoPsiquico", historicoPsiquicoController.get);
router.put("/:_id/historicoPsiquico", historicoPsiquicoController.put);

/**Hist familiar social */
router.get(
  "/:_id/historicoFamiliarSocial",
  historicoFamiliarSocialController.get
);
router.put(
  "/:_id/historicoFamiliarSocial",
  historicoFamiliarSocialController.put
);

/**Hist Forense */
router.get("/:_id/historicoForense", historicoForenseController.get);
router.put("/:_id/historicoForense", historicoForenseController.put);

/**Medicamento */
router.get("/:_id/medicamento/:medicamento", medicamentoController.getById);
router.get("/:_id/medicamento", medicamentoController.get);
router.put("/:_id/medicamento", medicamentoController.post);
router.put("/:_id/medicamento/:medicamento", medicamentoController.put);

/**Doenca Controller */
router.get("/:_id/doenca/:doenca", doencaController.getById);
router.get("/:_id/doenca", doencaController.get);
router.put("/:_id/doenca", doencaController.post);
router.put("/:_id/doenca/:doenca", doencaController.put);

/**Biometria Controller */
router.get("/:_id/biometria/:biometria", biometriaController.getById);
router.get("/:_id/biometria", biometriaController.get);
router.put("/:_id/biometria", biometriaController.post);
router.put("/:_id/biometria/:biometria", biometriaController.put);

/**Avalicao Controller */
router.get("/:_id/avaliacao/:avaliacao", avaliacaoController.getById);
router.get("/:_id/avaliacao", avaliacaoController.get);
router.put("/:_id/avaliacao", avaliacaoController.post);
router.put("/:_id/avaliacao/:avaliacao", avaliacaoController.put);

/**Pertence Controller */
router.get("/:_id/pertence/:pertence", pertenceController.getById);
router.get("/:_id/pertence", pertenceController.get);
router.put("/:_id/pertence", pertenceController.post);
router.put("/:_id/pertence/:pertence", pertenceController.put);

/**HistQuimico Controller */
router.get(
  "/:_id/historicoQuimico/:historicoQuimico",
  historicoQuimicoController.getById
);
router.get("/:_id/historicoQuimico", historicoQuimicoController.get);
router.put("/:_id/historicoQuimico", historicoQuimicoController.post);
router.put(
  "/:_id/historicoQuimico/:historicoQuimico",
  historicoQuimicoController.put
);

/**Saida Controller */
router.get("/:_id/saida/:saida", saidaController.getById);
router.get("/:_id/saida", saidaController.get);
router.put("/:_id/saida", saidaController.post);
router.put("/:_id/saida/:saida", saidaController.put);

/**Acolhido Controller */
router.get("/:_id/acolhido/:acolhido", userAuth, acolhidoController.getById);
router.get("/:_id/acolhido", userAuth, acolhidoController.getById);
router.post("/acolhido", userAuth, acolhidoController.post);
router.put("/:_id/acolhido/:acolhido", userAuth, acolhidoController.put);

/**Quadro Clinico Controller */
router.get("/:_id/quadroClinico", quadroClinicoController.get);
router.put("/:_id/quadroClinico", quadroClinicoController.put);

/**Tratamento Controller */
router.get("/:_id/tratamento", tratamentoController.get);
router.put("/:_id/tratamento/", tratamentoController.put);

router.post("/:_id/concluir", (req, res, next) => {
  Acolhimento.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: {
        ativo: false,
        motivoConclusao: req.query.motivoconclusao,
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/relatorio/:_id", (req, res, netx) => {
  let Comunidade = require("../models/comunidade");

  Promise.all([
    Acolhimento.findOne({ _id: req.params._id }).populate(
      "identificacao.acolhido"
    ),

    Comunidade.findOne({}, { correspondencia: 1 }),
  ]).then((acolhimento) => {
    res.status(200).json(acolhimento);
  });
});

module.exports = router;
