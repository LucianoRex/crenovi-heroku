const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { avaliacao: 1 }) 
    .then((acolhimento) => {      
      res.status(200).json(acolhimento.avaliacao);
    }).catch((err) => {
    
      res.status(500).json({message:err.message});
    });;
};

let getById = (req, res, next) => {  
  Acolhimento.findOne(
    { _id: req.params._id, "avaliacao._id": req.params.avaliacao },
    { "avaliacao.$": 1 }
  )  
    .then((acolhimento) => {
      res.status(200).json(acolhimento.avaliacao[0]);
    }).catch((err) => {
    
      res.status(500).json({message:err.message});
    });;
};

let put = (req, res, next) => {
    
  let data = {
    ...req.body.avaliacao,
  };
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id, "avaliacao._id": req.params.avaliacao },
    {
      $set: {
        "avaliacao.$": data,
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
    ...req.body.avaliacao,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        avaliacao: data,
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
