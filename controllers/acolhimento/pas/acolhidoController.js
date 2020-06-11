const Acolhido = require("../../../models/acolhido");
let get = (req, res, next) => {
  Acolhido.findById().then((acolhido) => {
    res.status(200).json(acolhido);
  });
};

let getById = (req, res, next) => {
  Acolhido.findOne({ _id: req.params.acolhido })
    .populate("ocupacao")
    .then((acolhido) => {
      res.status(200).json(acolhido);
    });
};

let put = (req, res, next) => {
  console.log('AtualizandoAcolhido')
  let data = {
    ...req.body.acolhido,
  };
  console.log(req.params)
  let mensagem = [];
  Acolhido.findOneAndUpdate(
    {
      _id: req.params.acolhido,
    },
    {
      $set: data,
    },
    {
     // new: true,
      //upsert: true,
    }
  )
    .then((acolhido) => {
      res.status(200).json(acolhido);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

let post = (req, res, next) => {
  let data = {
    ...req.body.acolhido,
  };
  delete data._id;
  let mensagem = [];
  Acolhido.create(new Acolhido(data))
    .then((acolhido) => {
      res.status(200).json(acolhido);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};
module.exports = {
  get: get,
  put: put,
  post: post,
  getById: getById,
};
