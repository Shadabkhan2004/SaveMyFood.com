const mongoose = require('mongoose');
require('dotenv').config();


const conn = async () => {
  await mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected To MongoDB");
}).catch((err) => {
  console.log("Not Connected To MongoDB");
})
}

conn();