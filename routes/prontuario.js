var express = require("express");
var router = express.Router();
const Prontuario = require("../models/prontuario");
const ProcedimentoPsicologico = require("../models/procedimentoPsicologico");
const mongoose = require("mongoose");
const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  chekRole,
} = require("./../utils/auth");

router.post("/:_id/concluir", userAuth, async (req, res, next) => {
  try {
    let prontuario = await Prontuario.findOne(
      { _id: req.params._id },
      { identificacao: 1 }
    );
    if (
      new Date(req.body.dataEgresso) <
      new Date(prontuario.identificacao.dataIngresso)
    ) {
      res.status(500).json({
        message: "Data de Egresso não pode ser anterior à data de Ingresso",
        success: false,
      });
    } else {
      Prontuario.findOneAndUpdate(
        {
          _id: req.params._id,
        },
        {
          $set: {
            ativo: false,
            motivoConclusao: req.body.motivo,
            "identificacao.dataEgresso": new Date(req.body.dataEgresso),
          },
        },
        {
          upsert: true,
        }
      )
        .then((prontuario) => {
          res.status(200).json(prontuario);
        })
        .catch((error) => {
          res.status(500).json({ error: true, message: error.message });
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/declaracaopertence/:_id", userAuth, (req, res, next) => {
  Prontuario.findOne({ _id: req.params._id }, { pertence: 1, identificacao: 1 })
    .populate("identificacao.acolhido")
    .populate("identificacao.convenio")
    .then((pertence) => {
      res.status(200).json(pertence);
    });
});

router.post(
  "/:_id/evolucaoPsicologica/relatorio",
  userAuth,
  (req, res, next) => {
    Prontuario.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params._id) } },
      {
        $lookup: {
          from: "acolhido",
          localField: "identificacao.acolhido",
          foreignField: "_id",
          as: "acolhido",
        },
      },

      {
        $project: {
          _id: 1,
          acolhido: 1,
          procedimentos: 1,
          consultas: 1,
          identificacao: 1,
          psicoterapia: {
            $filter: {
              input: "$psicoterapia",
              as: "psicoterapia",
              cond: {
                $and: [
                  { $gte: ["$$psicoterapia.data", new Date(req.body.dataI)] },
                  { $lte: ["$$psicoterapia.data", new Date(req.body.dataF)] },
                ],
              },
            },
          },
          consulta: {
            $filter: {
              input: "$agendamentoconsulta",

              as: "consulta",
              cond: {
                $and: [
                  { $gte: ["$$consulta.data", new Date(req.body.dataI)] },
                  { $lte: ["$$consulta.data", new Date(req.body.dataF)] },
                  { $eq: ["$$consulta.consultaEfetuada", true] },
                ],
              },
            },
          },
          avaliacao: {
            $filter: {
              input: "$avaliacao",
              as: "avaliacao",
              cond: {
                $and: [
                  { $gte: ["$$avaliacao.data", new Date(req.body.dataI)] },
                  { $lte: ["$$avaliacao.data", new Date(req.body.dataF)] },
                ],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "procedimentoPsicologico",
          localField: "psicoterapia.procedimento",
          foreignField: "_id",
          as: "procedimentos",
        },
      },
      {
        $lookup: {
          from: "tipoConsulta",
          localField: "consulta.tipo",
          foreignField: "_id",
          as: "consultas",
        },
      },
      {
        $group: {
          _id: {
            consultas: "$consultas.tipo",
            psicoterapia: "$psicoterapia",
            procedimentos: "$procedimentos.procedimento",
            avaliacoes: {
              disciplina: { $trunc: [{ $avg: "$avaliacao.disciplina" }] },
              autoestima: { $trunc: [{ $avg: "$avaliacao.autoestima" }] },
              reunioes: { $trunc: [{ $avg: "$avaliacao.reunioes" }] },
              espiritualidade: {
                $trunc: [{ $avg: "$avaliacao.espiritualidade" }],
              },
              higiene: { $trunc: [{ $avg: "$avaliacao.higiene" }] },
              criatividade: {
                $trunc: [{ $avg: "$avaliacao.criatividade" }],
              },
            },
            acolhido: {
              nome: "$acolhido.nome",
              dataNasc: "$acolhido.dataNasc",
            },
            identificacao: "$identificacao",
          },
        },
      },
    ]).then((relatorio) => {
      res.status(200).json(relatorio);
    });
  }
);

router.get("/relatorio/:_id", userAuth, (req, res, next) => {
  Prontuario.findOne(
    { _id: req.params._id },
    { identificacao: 1, responsavel: 1 }
  )
    .populate("identificacao.acolhido")
    .then((prontuario) => {
      res.status(200).json(prontuario);
    });
});
//retorna a lista de prontuarios
router.get("/", userAuth, (req, res, next) => {
  Prontuario.find({}, { identificacao: 1, ativo: 1 })
    .populate("identificacao.acolhido")
    .populate("identificacao.convenio")
    .then((prontuario) => {
      res.status(200).json(prontuario);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:_id/*", userAuth, (req, res, next) => {
  if (req.params[0].split("/")[1] == undefined) {
    Prontuario.findOne(
      {
        _id: req.params._id,
      },
      { [req.params[0]]: 1 }
    )
      .populate("identificacao.acolhido")      
      .populate("medicamento.medicamento")
      .populate("doenca.doenca")
      .populate("historicoQuimico.substancia")
      .populate("saida.motivo")
      .populate("agendamentoconsulta.tipo")
      .populate("pertence.pertence")
      .then((prontuario) => {
        req.query.array == "false"
          ? res.status(200).json(prontuario)
          : res.status(200).json(prontuario[req.params[0]]);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    let doc = req.params[0].split("/")[0];
    Prontuario.findOne(
      {
        _id: req.params._id,
        [doc + "._id"]: [req.params[0].split("/")[1]],
      },
      { [doc + ".$"]: 1 }
    )
      .populate(doc + "." + doc)
      .then((prontuario) => {
        res.status(200).json(prontuario[req.params[0].split("/")[0]][0]);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
});

router.put("/:_id/*", userAuth, (req, res, next) => {
  if (req.body.array != true) {
    Prontuario.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: {
          [req.body.path]: req.body[req.body.path],
        },
      },
      {
        upsert: true,
        new: true,
      }
    )
      .then((prontuario) => {
        res.status(200).json(prontuario);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    let data = {
      ...req.body[req.body.path],
    };
    if (data._id == null) {
      delete data._id;
      Prontuario.findOneAndUpdate(
        { _id: req.params._id },
        {
          $push: {
            [req.body.path]: data,
          },
          new: true,
        }
      )
        .then((prontuario) => {
          res.status(200).json(prontuario);
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    } else {
      let doc = req.params[0].split("/")[0];
      Prontuario.findOneAndUpdate(
        { _id: req.params._id, [doc + "._id"]: [req.params[0].split("/")[1]] },
        {
          $set: {
            [doc + ".$"]: data,
          },
          new: true,
        }
      )
        .then((prontuario) => {
          res.status(200).json(prontuario);
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    }
  }
});

router.post("/identificacao", userAuth, async (req, res, next) => {
  try {
    let confereAcolhido = await Prontuario.findOne({
      "identificacao.acolhido": req.body.identificacao.acolhido._id,
      ativo: true,
    });

    if (confereAcolhido) {
      res.status(500).json({ message: "Acolhido está em acolhimento" });
    } else {
      let data = {
        ...req.body,
      };
      Prontuario.create(new Prontuario(data))
        .then((prontuario) => {
          res.status(200).json(prontuario);
        })
        .catch((error) => {
          res.status(500).json({
            message: error.message,
          });
        });
    }
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.delete("/:_id", userAuth, (req, res, next) => {
  Prontuario.findOneAndRemove({ _id: req.params._id })
    .then((prontuario) => {
      res.status(200).json(prontuario);
    })
    .catch((error) => {
      res.status(500).json({
        message: error.message,
      });
    });
});
router.delete("/:_id/*", userAuth, (req, res, next) => {
  let data = {
    ...req.body[req.body.path],
  };

  let doc = req.params[0].split("/")[0];
  Prontuario.findOneAndUpdate(
    { _id: req.params._id },
    {
      $pull: {
        [doc]: {
          _id: [req.params[0].split("/")[1]],
        },
      },
    }
  )
    .then((prontuario) => {
      res.status(200).json(prontuario);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
