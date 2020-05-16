var express = require('express');
var router = express.Router();
const Acolhimento = require('../models/acolhimento');
const Acolhido = require('../models/acolhido');

router.get('/acolhido', function (req, res, next) {
  Acolhido.find().then((acolhido) => {
    res.status(200).json(acolhido);
  });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  Acolhimento.find().then((acolhimento) => {
    res.status(200).json(acolhimento);
  });
});

router.get('/:_id', function (req, res, next) {
  Acolhimento.findById(req.params._id).then((acolhimento) => {
    res.status(200).json(acolhimento);
  });
});



router.post('/', (req, res, next) => {
  console.log(req.body.identificacao);
  let data = {
    ...req.body,
  };
  delete data._id;
  Acolhimento.create(new Acolhimento(data)).then((acolhimento) => {
    res.status(200).json(acolhimento);
  });
});

router.put('/:_id', (req, res, next) => {
  let data = {
    ...req.body,
  };

  Acolhimento.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: data,
    }
  )
    .then((acolhimento) => {
      res.status(200).json(acolhimento);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete('/:_id', (req, res, next) => {
  Acolhimento.findOneAndRemove({
    _id: req.params._id,
  }).then((acolhimento) => {
    res.status(200).json(acolhimento);
  });
});

/**Acolhido */



module.exports = router;
