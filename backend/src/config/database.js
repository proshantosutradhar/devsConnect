const mongoose = require("mongoose");
require('dotenv').config();

connectDB = async()=>{
   await mongoose.connect(process.env.DATABASE);
   
};
module.exports = connectDB
