const LivroDiario = require("../../models/livroDiario");

let get = (req, res, next) => {
    console.log('Chegou')
    LivroDiario.find().then((livroDiario) => {
      console.log(livroDiario)

    res.status(200).json(livroDiario);
  });
};

let getById = (req, res, next) => {
  LivroDiario.findOne({ _id: req.params._id }).then((livroDiario) => {
    res.status(200).json(livroDiario);
  });
};

let put = (req, res, next) => {
  let data = {
    ...req.body,
  };
  let mensagem = [];
  LivroDiario.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    },
    {
      new: true,
    }
  )
    .then((livroDiario) => {
      res.status(200).json(livroDiario);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

let post = (req, res, next) => {
  let data = {
    ...req.body,
  };
  delete data._id;
  let mensagem = [];
  LivroDiario.create(new LivroDiario(data))
    .then((livroDiario) => {
      res.status(200).json(livroDiario);
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
