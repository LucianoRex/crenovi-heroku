const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { doenca: 1 })
    .populate("doenca.doenca")
    .then((acolhimento) => {
        console.log(acolhimento.doenca)
      res.status(200).json(acolhimento.doenca);
    });
};

let getById = (req, res, next) => {
  console.log(req.params.medicamento);
  Acolhimento.findOne(
    { _id: req.params._id, "doenca._id": req.params.doenca },
    { "doenca.$": 1 }
  )
    .populate("doenca.doenca")
    .then((acolhimento) => {
      res.status(200).json(acolhimento.doenca[0]);
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.doenca,
  };
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id, "doenca._id": req.params.doenca },
    {
      $set: {
        "doenca.$": data,
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
    ...req.body.doenca,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        doenca: data,
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
