var express = require("express");
var router = express.Router();
const Colaborador = require("../models/colaborador");

const {
  userRegister,
  userLogin,
  userAuth,
  serializeUser,
  chekRole,
  chekRoles,
} = require("./../utils/auth");

router.get("/colaborador", function (req, res, next) {
  console.log("buscar colabradores");
  Colaborador.find().then((colaborador) => {
    res.status(200).json(colaborador);
  });
});

router.get("/colaborador/:_id", function (req, res, next) {
  Colaborador.findOne({ _id: req.params._id }).then((colaborador) => {
    res.status(200).json(colaborador);
  });
});

router.post(
  "/colaborador",
  userAuth,
  chekRoles(["superadmin"]),
  async (req, res, next) => {
    let data = {
      ...req.body,
    };
    delete data._id;
    await Colaborador.create(new Colaborador(data)).then((colaborador) => {
      res.status(200).json(colaborador);
    });
  }
);

router.put(
  "/colaborador/:_id",
  userAuth,
  chekRoles(["superadmin"]),
  async (req, res, next) => {
    let data = {
      ...req.body,
    };

    await Colaborador.findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        $set: data,

      },
      {
        new:true,
        useFindAndModify:true
      }
    )
      .then((colaborador) => {
        res.status(200).json(colaborador);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
);

router.delete("/:_id", (req, res, next) => {
  Colaborador.findOneAndRemove({
    _id: req.params._id,
  }).then((colaborador) => {
    res.status(200).json(colaborador);
  });
});
module.exports = router;
