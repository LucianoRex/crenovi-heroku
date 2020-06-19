const Acolhimento = require("../../../models/acolhimento");
let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { identificacao: 1, ativo: 1 })
    .populate("identificacao.acolhido")
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let put = (req, res, next) => {
  let data = {
    ...req.body.identificacao,
  };
  Acolhimento.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: {
        identificacao: data,
        "criado.usuario": req.user.username,
      },
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento.identificacao);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

let post = async (req, res, next) => {
  let confereAcolhido = await Acolhimento.findOne({
    "identificacao.acolhido": req.body.identificacao.acolhido._id,
    ativo: true,
  });

  if (confereAcolhido) {    
    res.status(500).json({ message: "Acolhido está em acolhimento" });
  } else {
    let data = {
      ...req.body,
    };
    delete data._id;
    let mensagem = [];
    Acolhimento.create(new Acolhimento(data))
      .then((acolhimento) => {
        res.status(200).json(acolhimento);
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  }
};
module.exports = {
  get: get,
  put: put,
  post: post,
};
