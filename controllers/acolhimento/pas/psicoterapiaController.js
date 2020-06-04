const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { psicoterapia: 1 }).then(
    (acolhimento) => {
      res.status(200).json(acolhimento.psicoterapia);
    }
  )
  .catch((err) => {
    
    res.status(500).json({message:err.message});
  });
};

let getById = (req, res, next) => {
  Acolhimento.findOne(
    { _id: req.params._id, "psicoterapia._id": req.params.psicoterapia },
    { "psicoterapia.$": 1 }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento.psicoterapia[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let put = (req, res, next) => {
  console.log(req.user);
  let data = {
    ...req.body.psicoterapia,
  };
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id, "psicoterapia._id": req.params.psicoterapia },
    {
      $set: {
        "psicoterapia.$": data,
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let post = (req, res, next) => {
  let data = {
    ...req.body.psicoterapia,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        psicoterapia: data,
      },
      new: true,
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
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
};
