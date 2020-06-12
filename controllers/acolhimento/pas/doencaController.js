const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { doenca: 1 })
    .populate("doenca.doenca")
    .then((acolhimento) => {
      res.status(200).json(acolhimento.doenca);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let getById = (req, res, next) => {
  Acolhimento.findOne(
    { _id: req.params._id, "doenca._id": req.params.doenca },
    { "doenca.$": 1 }
  )
    .populate("doenca.doenca")
    .then((acolhimento) => {
      res.status(200).json(acolhimento.doenca[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.doenca,
  };
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id, "doenca._id": req.params.doenca },
    {
      $set: {
        "doenca.$": data,
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento.doenca);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let post = (req, res, next) => {
  let data = {
    ...req.body.doenca,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        doenca: data,
      },
      new: true,
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento.doenca);
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
