const RotinaDiaria = require("../../models/rotinaDiaria");

let get = (req, res, next) => {
  RotinaDiaria.find().then((rotinaDiaria) => {
    res.status(200).json(rotinaDiaria);
  });
};

let getById = (req, res, next) => {
  RotinaDiaria.findOne({ _id: req.params._id }).then((rotinaDiaria) => {
    res.status(200).json(rotinaDiaria);
  });
};

let put = (req, res, next) => {  
  let data = {
    ...req.body,
  };
  let mensagem = [];
  RotinaDiaria.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    },
    {
      //  new: true,
      upsert: true,
    }
  )
    .then((rotinaDiaria) => {
      res.status(200).json(rotinaDiaria);
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
  RotinaDiaria.create(new RotinaDiaria(data))
    .then((rotinaDiaria) => {
      res.status(200).json(rotinaDiaria);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

let remove = (req, res, next) => {
  RotinaDiaria.findOneAndRemove({
    _id: req.params._id,
  })
    .then((rotinaDiaria) => {
      res.status(200).json(rotinaDiaria);
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
  remove: remove,
};
