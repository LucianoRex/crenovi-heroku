const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.find({}, { identificacao: 1, ativo: 1 })
    .populate("identificacao.acolhido")
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    });
};

let getById = (req, res, next) => {
  Acolhimento.findById(req.params._id)
    .populate("identificacao.acolhido")
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.responsavel,
  };
  console.log(data);
  Acolhimento.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: {
        responsavel: data,
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

let post = (req, res, next) => {
  console.log(req.body.identificacao);
  let data = {
    ...req.body,
  };
  delete data._id;
  Acolhimento.create(new Acolhimento(data)).then((acolhimento) => {
    res.status(200).json(acolhimento);
  });
};
module.exports = {
  get: get,
  put: put,
  getById: getById,
  post: post,
};
