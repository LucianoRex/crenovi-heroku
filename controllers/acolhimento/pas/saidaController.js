const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { saida: 1 })
    .then((acolhimento) => {
      res.status(200).json(acolhimento.saida);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let getById = (req, res, next) => {
  Acolhimento.findOne(
    { _id: req.params._id, "saida._id": req.params.saida },
    { "saida.$": 1 }
  ).then((acolhimento) => {
    res.status(200).json(acolhimento.saida[0]);
  })
  .catch((err) => {
    
    res.status(500).json({message:err.message});
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
    
      res.status(500).json({message:err.message});
    });
};

let post = (req, res, next) => {
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
    .catch((err) => {
    
      res.status(500).json({message:err.message});
    });
};
module.exports = {
  get: get,
  put: put,
  post: post,
  getById: getById,
};
