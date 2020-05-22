const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { biometria: 1 }) 
    .then((acolhimento) => {
        console.log(acolhimento.biometria)
      res.status(200).json(acolhimento.biometria);
    });
};

let getById = (req, res, next) => {
  console.log(req.params.medicamento);
  Acolhimento.findOne(
    { _id: req.params._id, "biometria._id": req.params.biometria },
    { "biometria.$": 1 }
  )  
    .then((acolhimento) => {
      res.status(200).json(acolhimento.biometria[0]);
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.biometria,
  };
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id, "biometria._id": req.params.biometria },
    {
      $set: {
        "biometria.$": data,
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
    ...req.body.biometria,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        biometria: data,
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
