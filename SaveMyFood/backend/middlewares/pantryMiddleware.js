require('dotenv').config();
const jwt = require('jsonwebtoken');
const joi = require('joi');


const pantryMiddleware = (req,res,next) => {
  try {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(401).json({message:"Not Authorized , JWT Token required"});
    }
    const decoded = jwt.verify(auth,process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({message:"Bad Request"});
  }
  
}

const postPantryMiddleware = (req,res,next) => {
  const Schema = joi.object({
    name:joi.string().min(2).max(100).required(),
    quantity:joi.number().integer().min(1),
    expiryDate:joi.date().required(),
    category:joi.string(),
  });

  const {error} = Schema.validate(req.body);

  if(error){
    return res.status(400).json({message:"Bad Request",error:error.details[0].message})
  }
  next();
}


module.exports = {
  pantryMiddleware,
  postPantryMiddleware,
  
}