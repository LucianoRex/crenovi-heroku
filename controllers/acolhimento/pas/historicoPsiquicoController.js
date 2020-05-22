const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { historicoPsiquico: 1 }).then(
    (acolhimento) => {
      res.status(200).json(acolhimento);
    }
  );
};

let put = (req, res, next) => {
  let data = {
    ...req.body.historicoPsiquico,
  };
  Acolhimento.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: {
        historicoPsiquico: data,
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

module.exports = {
  get: get,
  put: put,
};