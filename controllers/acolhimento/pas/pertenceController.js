const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { pertence: 1 }).then(
    (acolhimento) => {
     
      res.status(200).json(acolhimento.pertence);
    }
  )
  .catch((err) => {
    
    res.status(500).json({message:err.message});
  });
};

let getById = (req, res, next) => {
  Acolhimento.findOne(
    { _id: req.params._id, "pertence._id": req.params.pertence },
    { "pertence.$": 1 }
  ).then((acolhimento) => {
    res.status(200).json(acolhimento.pertence[0]);
  });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.pertence,
  };
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id, "pertence._id": req.params.pertence },
    {
      $set: {
        "pertence.$": data,
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
    ...req.body.pertence,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $addToSet: {
        pertence: data,
      },
      upsert: true,
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
