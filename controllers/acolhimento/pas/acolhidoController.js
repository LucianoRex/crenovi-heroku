const Acolhido = require("../../../models/acolhido");
let get = (req, res, next) => {
  Acolhido.findById().then((acolhido) => {
    res.status(200).json(acolhido);
  });
};

let getById = (req, res, next) => {
  console.log("por id ");
  Acolhido.findOne({ _id: req.params._id }).then((acolhido) => {
    res.status(200).json(acolhido);
  });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.acolhido,
  };
  Acolhido.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    }
  )
    .then((acolhido) => {
      res.status(200).json(acolhido);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
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
      res.status(500).json(error);
    });
};
module.exports = {
  get: get,
  put: put,
  post: post,
  getById: getById,
};
