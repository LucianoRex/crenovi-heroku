const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { agendamentoConsulta: 1 })
    .then((acolhimento) => {
      res.status(200).json(acolhimento.agendamentoConsulta);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let getById = (req, res, next) => {
  Acolhimento.findOne(
    {
      _id: req.params._id,
      "agendamentoConsulta._id": req.params.agendamentoconsulta,
    },
    { "agendamentoConsulta.$": 1 }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento.agendamentoConsulta[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.agendamentoconsulta,
  };
  Acolhimento.findOneAndUpdate(
    {
      _id: req.params._id,
      "agendamentoConsulta._id": req.params.agendamentoconsulta,
    },
    {
      $set: {
        "agendamentoConsulta.$": data,
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
    ...req.body.agendamentoconsulta,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        agendamentoConsulta: data,
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
let remove = (req, res, next) => {
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $pull: {
        agendamentoConsulta: {
          _id: req.params.agendamentoConsulta,
        },
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento.agendamentoConsulta);
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
  remove: remove,
};
