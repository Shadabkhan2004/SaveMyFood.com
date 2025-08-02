const joi = require('joi');

const signupMiddleware = (req,res,next) => {
  const Schema = joi.object({
    name: joi.string().min(5).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required()
  });

  const {error} = Schema.validate(req.body);
  if(error){
    return res.json({message:"Bad Request",error:error.details[0].message});
  }
  next();
}


const loginMiddleware = (req,res,next) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required()
  });

  const {error} = Schema.validate(req.body);
  if(error){
    return res.json({message:"Bad Request",error:error.details[0].message});
  }
  next();
}

module.exports = {
  signupMiddleware,
  loginMiddleware
}
