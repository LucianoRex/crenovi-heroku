var express = require('express');
var router = express.Router()
const Substancia = require('../models/substancia');


/* GET users listing. */
router.get('/', function (req, res, next) {
   
    Substancia
        .find()
        .then(substancia => {
            res.status(200).json(substancia)
        })
});

router.post('/', (req, res, next) => {
    let data = {
        ...req.body,
    }
    delete data._id
    Substancia
        .create(new Substancia(data))
        .then(substancia => {
            res.status(200).json(substancia)
        })
});

router.put('/:_id', (req, res, next) => {
    let data = {
        ...req.body
    }

    Substancia
        .findOneAndUpdate({
            _id: req.params._id
        }, {
            $set: data,

        },
        )
        .then(substancia => {
            res.status(200).json(substancia)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.delete('/:_id', (req, res, next) => {
    Substancia.findOneAndRemove(
        {
            _id: req.params._id
        }
    ).then(substancia => {
        res.status(200).json(substancia)
    })
})
module.exports = router;
