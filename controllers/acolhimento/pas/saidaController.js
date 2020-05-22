const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { saida: 1 }) 
    .then((acolhimento) => {
        console.log(acolhimento.saida)
      res.status(200).json(acolhimento.saida);
    });
};

let getById = (req, res, next) => {
  console.log(req.params.medicamento);
  Acolhimento.findOne(
    { _id: req.params._id, "saida._id": req.params.saida },
    { "saida.$": 1 }
  )  
    .then((acolhimento) => {
      res.status(200).json(acolhimento.saida[0]);
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.saida,
  };
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id, "saida._id": req.params.saida },
    {
      $set: {
        "saida.$": data,
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
    ...req.body.saida,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        saida: data,
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
