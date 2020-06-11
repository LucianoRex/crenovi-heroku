const Acolhimento = require("../../../models/acolhimento");
const mongoose = require("mongoose");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { evolucaoPsicologica: 1 })
    .then((acolhimento) => {
      res.status(200).json(acolhimento.evolucaoPsicologica);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let getById = (req, res, next) => {
  Acolhimento.findOne(
    {
      _id: req.params._id,
      "evolucaoPsicologica._id": req.params.evolucaoPsicologica,
    },
    { "evolucaoPsicologica.$": 1 }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento.evolucaoPsicologica[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let put = (req, res, next) => {  
  let data = {
    ...req.body.evolucaoPsicologica,
  };
  Acolhimento.findOneAndUpdate(
    {
      _id: req.params._id,
      "evolucaoPsicologica._id": req.params.evolucaoPsicologica,
    },
    {
      $set: {
        "evolucaoPsicologica.$": data,
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let post = (req, res, next) => {
  let data = {
    ...req.body.evolucaoPsicologica,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        evolucaoPsicologica: data,
      },
      new: true,
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let procedimentos = (req, res, next) => {
  Acolhimento.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params._id) } },
    {
      $project: {
        _id: 1,
        procedimento: {
          $filter: {
            input: "$psicoterapia",

            as: "procedimento",
            cond: {
              /* $and: [
                { $eq: [{ $month: "$$evolucaoPsicologica.data" }, 5] },
                { $eq: [{ $year: "$$evolucaoPsicologica.data" }, 2020] },
              ],
              */

              $and: [
                { $gte: ["$$procedimento.data", new Date(req.body.dataI)] },
                { $lte: ["$$procedimento.data", new Date(req.body.dataF)] },
              ],
            },
          },
        },
        consulta: {
          $filter: {
            input: "$agendamentoConsulta",

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
      },
    },
    { $unwind: "$_id" },
    //{ $unwind: "$consulta" },

    /* {
      $group: {
        _id: "$psicoterapia",
        allValues: { $push: "$procedimento.procedimento" },
      },
    },
*/
    {
      $group: {
        _id: "$agendamentoConsulta",
        allValues2: { $push: "$consulta" },
        _id: "$psicoterapia",
        allValues: { $push: "$procedimento.procedimento" },
      },
    },
    {
      $project: {
        procedimentos: { $concatArrays: "$allValues" },
        consultas: "$allValues2",
      },
    },
  ])
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

let consultas = (req, res, next) => {
  Acolhimento.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params._id) } },
    {
      $project: {
        _id: 1,
        consulta: {
          $filter: {
            input: "$agendamentoConsulta",

            as: "consulta",
            cond: {
              $and: [
                { $gte: ["$$consulta.data", new Date(req.body.dataI)] },
                { $lte: ["$$consulta.data", new Date(req.body.dataF)] },
              ],
            },
          },
        },
      },
    },
    /* { $unwind: "$consulta" },

    {
      $group: {
        _id: "$agendamentoConsulta",
        allValues: { $push: "$consulta.horario" },
      },
    },

    {
      $project: {
        procedimentos: { $concatArrays: "$allValues" },
      },
    },
    */
  ])
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

let getAcolhido = (req, res, next) => {  
  Acolhimento.findOne(
    {
      _id: req.params._id,
    },
    {
      identificacao: 1,
    }
  )
    .populate("identificacao.acolhido")
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
module.exports = {
  get: get,
  put: put,
  post: post,
  getById: getById,
  procedimentos: procedimentos,
  getAcolhido: getAcolhido,
  consultas: consultas,
};
