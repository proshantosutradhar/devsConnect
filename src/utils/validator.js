
const validator = require('validator');
const User = require('../models/user');
const jwt = require("jsonwebtoken")


const userAuth = async(req, res, next)=>{
    try{
        const cookie = await req.cookies;
    const {token} = cookie;

       if(!token){
            throw new Error("Token is invalid!!")
        }
   const decoded = await jwt.verify(token, "mykey");
   const {id} = decoded;
   const user = await User.findById(id);
   if(!user){
    throw new Error("user not found")
   }
   req.user = user;
   next()

     
      
    }catch(err){
        res.status(404).send("error " + err)
    }
}

const updateValidation = (req)=>{
    const isAllowed = ["firstName", "lastName", "skills"];
    const isValid = Object.keys(req.body).every(key=>isAllowed.includes(key)

    )
    if(!isValid){
        throw new Error("these fields cant be updated")
    }
    const {firstName, lastName} = req.body;
    if(firstName.length <=2 || lastName.length <= 2  ){
        throw new Error("enter valid name")
    }
 

}
const validateFun = (req)=>{
    const {firstName, lastName, email, password} = req.body;

    if(!firstName && !lastName){
        throw new Error("name field is empty")
    };

    if(!validator.isEmail(email)){
        throw new Error("email isnt valid")
    };

    if(!validator.isStrongPassword(password)){
        throw new Error("enter strong password")
    }
    
}

module.exports = {
  validateFun,
  userAuth,
  updateValidation
};
