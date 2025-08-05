const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req,res,next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User Already Exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    user
      .save()
      .then(() => {
        return res
          .status(201)
          .json({ message: "Signup Successful", success: true });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Signup Unsuccessful", success: false });
      });
  } catch (error) {
    console.log(error);
    return res
          .status(500)
          .json({ message: "Error while Signing Up"});
  }
  
}

const login = async (req,res,next) => {
  try {
    const {email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(409)
        .json({ message: "Invalid Email", success: false });
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
      return res
        .status(401)
        .json({ message: "Invalid Password", success: false });
    }

    const jwtToken = jwt.sign({
      name:user.name,id:user._id,email:user.email
    },process.env.JWT_SECRET,{
      expiresIn:'7d'
    });

    return res
          .status(200)
          .json({ message: "Login Successful", success: true , token:jwtToken , name:user.name , id: user._id , email:user.email});

    
  } catch (error) {
    return res
          .status(500)
          .json({ message: "Error while Logging In"});
  }
  
}



module.exports = {
  signup,
  login
}