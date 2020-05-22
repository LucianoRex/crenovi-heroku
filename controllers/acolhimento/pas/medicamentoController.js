const Acolhimento = require("../../../models/acolhimento");

let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { medicamento: 1 })
    .populate("medicamento.medicamento")
    .then((acolhimento) => {
      res.status(200).json(acolhimento.medicamento);
    });
};

let getById = (req, res, next) => {
  console.log(req.params.medicamento);
  Acolhimento.findOne(
    { _id: req.params._id, "medicamento._id": req.params.medicamento },
    { "medicamento.$": 1 }
  )
    .populate("medicamento.medicamento")
    .then((acolhimento) => {
      res.status(200).json(acolhimento.medicamento[0] || {});
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.medicamento,
  };
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id, "medicamento._id": req.params.medicamento },
    {
      $set: {
        "medicamento.$": data,
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

let post = (req, res, next) => {
  console.log("Chegou no post");
  console.log(req.body);
  let data = {
    ...req.body.medicamento,
  };
  delete data._id;
  let mensagem = [];
  Acolhimento.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        medicamento: data,
      },
      new: true,
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((error) => {
      for (field in error.errors) {
        mensagem.push(error.errors[field].message);
      }
      if (error.name === "MongoError" && error.code === 11000) {
        //res.status(500).json("Acolhido selecionado já está em acolhimento");
        mensagem.push("Acolhido selecionado já está em acolhimento");
      }
      res.status(500).json({
        message: mensagem,
      });
    });
  /**
     * for (field in error.errors) {
        mensagem.push(error.errors[field].message);
      }
      res.status(500).json({
        message: mensagem,
      });
     */
};
module.exports = {
  get: get,
  put: put,
  post: post,
  getById: getById,
};
