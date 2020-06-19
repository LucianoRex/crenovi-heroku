const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { historicoQuimico: 1 })
    .populate("historicoQuimico.substancia")
    .then((acolhimento) => {
      res.status(200).json(acolhimento.historicoQuimico);
    })
    .catch((err) => {
    
      res.status(500).json({message:err.message});
    });;
};

let getById = (req, res, next) => {
  Acolhimento.findOne(
    {
      _id: req.params._id,
      "historicoQuimico._id": req.params.historicoQuimico,
    },
    { "historicoQuimico.$": 1 }
  )
    .populate("substancia.substancia")
    .then((acolhimento) => {
      res.status(200).json(acolhimento.historicoQuimico[0]);
    })
    .catch((err) => {
    
      res.status(500).json({message:err.message});
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.historicoQuimico,
  };
  Acolhimento.findOneAndUpdate(
    {
      _id: req.params._id,
      "historicoQuimico._id": req.params.historicoQuimico,
    },
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
    
      res.status(500).json({message:err.message});
    });
};

let post = (req, res, next) => {
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
    .catch((err) => {
    
      res.status(500).json({message:err.message});
    });
};
let remove = (req, res, next) => {
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $pull: {
        historicoQuimico: {
          _id: req.params.historicoQuimico,
        },
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento.historicoQuimico);
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
  remove:remove
};
