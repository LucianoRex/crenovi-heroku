var express = require("express");
var router = express.Router();
const comunidade = require("../models/comunidade");

router.get("/comunidade", function (req, res, next) {
  comunidade.findOne().then((comunidade) => {
    res.status(200).json(comunidade);
  });
});

router.post("/comunidade", async (req, res, next) => {
  let data = {
    ...req.body,
  };
  console.log(!comunidade.exists);
  console.log(req.body);

  let c = await comunidade.find();
  console.log(c);
  if (c.length == 0) {
    comunidade
      .create(new comunidade(data))
      .then((comunidade) => {
        res.status(200).json(comunidade);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    comunidade
      .update({}, { $set: data })
      .then((comunidade) => {
        res.status(200).json(comunidade);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  }
});

/*router.put("/:_id", (req, res, next) => {
  let data = {
    ...req.body,
  };

  comunidade
    .findOneAndUpdate(
      {
        _id: req.params._id,
      },
      {
        $set: data,
      }
    )
    .then((comunidade) => {
      res.status(200).json(comunidade);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
*/
/*router.delete("/:_id", (req, res, next) => {
  comunidade
    .findOneAndRemove({
      _id: req.params._id,
    })
    .then((comunidade) => {
      res.status(200).json(comunidade);
    });
});
*/
module.exports = router;
