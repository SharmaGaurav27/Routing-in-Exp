/*const express = require("express");
const Router = express.Router();  */ //or 

const{ Router } = require("express");
const userRouter = Router();


userRouter.post("/signup",(req,res)=>{ 
    res.json({
        message:"SignUp End-Point"
    })
});

userRouter.post("/sign",(req,res)=>{
    res.json({
        message:"SignUp End-Point"
    })
});

userRouter.get("/purchases",(req,res)=>{
    res.json({
        message:"SignUp End-Point"
    })
});

module.exports={
    userRouter:userRouter
}