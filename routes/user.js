const{ Router } = require("express");
const{ userModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET_PASSWORD  = "Gaurav276726";
const userRouter = Router();


userRouter.post("/signup",async (req, res) => {
        const { email, password, firstName, lastName } = req.body; // add zod validation 
        // hash the password here so palintext pass is not stored in database
        try{
            await userModel.create({
                email: email,
                password: password,
                firstName: firstName, 
                lastName: lastName,
            });
        }catch(err){
          console.log("Your Signup has failed")  
        }
        res.json({
            message:"Your Are Signed in"
        })

    });

userRouter.post("/sign",async (req,res)=>{
   const {email , password} = req.body;

   const user = await userModel.findOne({
    email:email,
    password:password
   })

   if(user){
    const token = jwt.sign({
          id:user._id
    },JWT_SECRET_PASSWORD)

    res.json({
        token:token
    })
  }
  else{
    res.status(404).json({
     message:"Incorrect Credentials"
  })

  }
  
});

userRouter.get("/purchases",(req,res)=>{
    res.json({
        message:"SignUp End-Point"
    })
});

module.exports={
    userRouter:userRouter
}