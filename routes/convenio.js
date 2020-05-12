var express = require('express');
var router = express.Router()
const Convenio = require('../models/convenio');


/* GET users listing. */
router.get('/', function (req, res, next) {
   
    Convenio
        .find()
        .then(convenio => {
            res.status(200).json(convenio)
        })
});

router.post('/', (req, res, next) => {
    let data = {
        ...req.body,
    }
    delete data._id
    Convenio
        .create(new Convenio(data))
        .then(convenio => {
            res.status(200).json(convenio)
        })
});

router.put('/:_id', (req, res, next) => {
    let data = {
        ...req.body
    }

    Convenio
        .findOneAndUpdate({
            _id: req.params._id
        }, {
            $set: data,

        },
        )
        .then(convenio => {
            res.status(200).json(convenio)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.delete('/:_id', (req, res, next) => {
    Convenio.findOneAndRemove(
        {
            _id: req.params._id
        }
    ).then(convenio => {
        res.status(200).json(convenio)
    })
})
module.exports = router;
