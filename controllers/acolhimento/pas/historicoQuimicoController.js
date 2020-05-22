const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { historicoQuimico: 1 }) 
    .then((acolhimento) => {
        console.log(acolhimento.historicoQuimico)
      res.status(200).json(acolhimento.historicoQuimico);
    });
};

let getById = (req, res, next) => {
  console.log(req.params.medicamento);
  Acolhimento.findOne(
    { _id: req.params._id, "historicoQuimico._id": req.params.historicoQuimico },
    { "historicoQuimico.$": 1 }
  )  
    .then((acolhimento) => {
      res.status(200).json(acolhimento.historicoQuimico[0]);
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.historicoQuimico,
  };
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id, "historicoQuimico._id": req.params.historicoQuimico },
    {
      $set: {
        "historicoQuimico.$": data,
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

let post = (req, res, next) => {
  console.log(req.body);
  let data = {
    ...req.body.historicoQuimico,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        historicoQuimico: data,
      },
      new: true,
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
module.exports = {
  get: get,
  put: put,
  post: post,
  getById: getById,
};
