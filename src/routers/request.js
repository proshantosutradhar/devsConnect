const express = require("express");


const requestRouter = express.Router();
requestRouter.get('/connectionrequest', (req,res)=>{
    res.send("data is erer")
})


module.exports = requestRouter;