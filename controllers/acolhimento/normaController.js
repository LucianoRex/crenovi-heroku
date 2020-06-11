const Norma = require("../../models/norma");

let get = (req, res, next) => {    
    Norma.findOne().then((norma) => {      
    res.status(200).json(norma);
  });
};


let post = async (req, res, next) => {
  let data = {
    ...req.body,
  };  
  delete data._id;  
  let c = await Norma.find();  
  if (c.length == 0) {
    Norma
      .create(new Norma(data))
      .then((norma) => {
        res.status(200).json(norma);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {      
    Norma
      .update({}, { $set: data })
      .then((norma) => {
        res.status(200).json(norma);
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } 
};
module.exports = {
  get: get,  
  post: post,  
};
