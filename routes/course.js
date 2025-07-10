const { Router } = require("express")

const courseRouter = Router();

courseRouter.post("/purchase",(req,res)=>{
    res.json({
        message:"SignUp End-Point"
    })
});

courseRouter.get("/preview",(req,res)=>{
    res.json({  
        message:"SignUp End-Point"
    })
});

module.exports={
    courseRouter:courseRouter
}