const model = require("../model/model");
 require("dotenv").config()

 const postRequest = (req , res) =>{
     const umarData = new model({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         phoneNumber: req.body.phoneNumber,
     })
     umarData
     .save()
     .then(response => res.json(response))
     .catch((err) => console.log(err));
 }

 module.exports = postRequest;