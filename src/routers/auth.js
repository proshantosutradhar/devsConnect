const express = require("express");
const bcrypt = require('bcrypt');
const User = require('../models/user')

const { validateFun } = require('../utils/validator');

const authRouter = express.Router();

authRouter.post('/signup',async(req,res)=>{
    const {firstName, lastName, email, password}= req?.body
    const user = new User({firstName, lastName, email, password
    });
    
   try{
         validateFun(req)

    await user.save()
    res.send("user is added")
    
   }catch(err){
    res.status(404).json({message: " user not added", err})
    
   }

});

authRouter.post('/login', async (req,res)=>{
  const {email, password}= req.body;
 try{
  
   const user = await User.findOne({ email }).select("+password");

  if(!user){
    throw new Error("email not found")
  }
  const gotPass = await user.passwordCheck(password.trim())
   if(!gotPass){
    throw new Error("pass not valid")
  }
const token = await user.setJWT()
  res.cookie("token", token);
  res.send("login successful")
 } catch(err){
    res.status(400).send("ERROR: " + err.message); }
})

authRouter.post('/logout', (req,res)=>{
    res.clearCookie("token");
    res.send("logout sucessfull")
})



module.exports = authRouter;