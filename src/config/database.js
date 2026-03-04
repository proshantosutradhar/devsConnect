const mongoose = require("mongoose");

connectDB = async()=>{
   await mongoose.connect('mongodb+srv://proshanto:5cqwQka2sZspS-f@devtinder.mg0cmff.mongodb.net/devtinder');
   
};
module.exports = connectDB