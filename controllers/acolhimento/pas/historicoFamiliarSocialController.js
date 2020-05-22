const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { historicoFamiliarSocial: 1 }).then(
    (acolhimento) => {
      res.status(200).json(acolhimento);
    }
  );
};

let put = (req, res, next) => {
  let data = {
    ...req.body.historicoFamiliarSocial,
  };
  console.log(data);
  Acolhimento.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: {
        historicoFamiliarSocial: data,
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
module.exports = {
  get: get,
  put: put,
};