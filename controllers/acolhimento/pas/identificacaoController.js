const Acolhimento = require("../../../models/acolhimento");
let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { identificacao: 1, ativo: 1 })
    .populate("identificacao.acolhido")
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
    
      res.status(500).json({message:err.message});
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
      if (
        acolhimento.identificacao.dataIngresso >
        acolhimento.identificacao.dataEgresso
      ) {
        res.status(500).json({
          message: "Data de Egresso não pode ser anterior à data de Ingresso",
          success: false,
        });
      } else {
        res.status(200).json(acolhimento.identificacao);
      }
    })
    .catch((err) => {
    
      res.status(500).json({message:err.message});
    });
};

let post = (req, res, next) => {
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
};
