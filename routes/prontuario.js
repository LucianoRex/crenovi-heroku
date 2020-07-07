var express = require("express");
var router = express.Router();
const Prontuario = require("../models/prontuario");
const ProcedimentoPsicologico = require("../models/procedimentoPsicologico");
const mongoose = require("mongoose");

router.post("/:_id/evolucaoPsicologica/relatorio", (req, res, next) => {
  console.log(req.body);
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
              /* $and: [
                { $eq: [{ $month: "$$evolucaoPsicologica.data" }, 5] },
                { $eq: [{ $year: "$$evolucaoPsicologica.data" }, 2020] },
              ],
              */

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

    //{ $unwind: "$avaliacao" },
    //{ $unwind: "$consulta" },

    /* {
      $group: {
        _id: "$psicoterapia",
        allValues: { $push: "$procedimento.procedimento" },
      },
    },
*/
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
            disciplina: { $trunc: [{ $avg: "$avaliacao.disciplina" }, 1] },
            autoestima: { $trunc: [{ $avg: "$avaliacao.autoestima" }, 1] },
            reunioes: { $trunc: [{ $avg: "$avaliacao.reunioes" }, 1] },
            espiritualidade: {
              $trunc: [{ $avg: "$avaliacao.espiritualidade" }, 1],
            },
            higiene: { $trunc: [{ $avg: "$avaliacao.higiene" }, 1] },
            criatividade: { $trunc: [{ $avg: "$avaliacao.criatividade" }, 1] },
          },
          acolhido: { nome: "$acolhido.nome", dataNasc: "$acolhido.dataNasc" },
          identificacao: "$identificacao",
        },
      },
    },
  ]).then((relatorio) => {
    res.status(200).json(relatorio);
  });
});

router.get("/relatorio/:_id", (req, res, next) => {
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
router.get("/", (req, res, next) => {
  Prontuario.find({}, { identificacao: 1, ativo: 1 })
    .populate("identificacao.acolhido")
    .then((prontuario) => {
      res.status(200).json(prontuario);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get("/:_id/*", (req, res, next) => {
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

router.put("/:_id/*", (req, res, next) => {
  console.log(req.body);
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
    console.log(data._id);
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

router.post("/identificacao", async (req, res, next) => {
  console.log(req.body.identificacao);
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
    //  delete data._id;
    console.log(data.convenio);
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
});

router.delete("/:_id/*", (req, res, next) => {
  let data = {
    ...req.body[req.body.path],
  };
  console.log("Deletar array");

  let doc = req.params[0].split("/")[0];
  console.log(doc);
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
