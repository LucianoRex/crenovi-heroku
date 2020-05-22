const Acolhimento = require("../../../models/acolhimento");
let get = (req, res, next) => {
  Acolhimento.findOne({ _id: req.params._id }, { identificacao: 1 })
    .populate("identificacao.acolhido")
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
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
  console.log(req.body.identificacao);
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
};
