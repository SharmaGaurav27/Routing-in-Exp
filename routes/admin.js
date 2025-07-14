const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../Config");
const { adminModel, courseModel} = require("../db");
const { adminMiddleware } = require("../Middleware/admin");

//adminRouter.use(adminMiddleware)
adminRouter.post("/signup",async (req, res)=>{
     const { email, password, firstName, lastName } = req.body; // add zod validation 
        // hash the password here so palintext pass is not stored in database
        try{
            await adminModel.create({
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
})

adminRouter.post("/signin",async(req, res)=>{
    const {email , password} = req.body;

   const admin = await adminModel.findOne({
    email:email,
    password:password
   })

   if(admin){
    const token = jwt.sign({
          id:admin._id
    },JWT_ADMIN_PASSWORD)

    res.json({
        token:token
    })
  }
  else{
    res.status(404).json({
     message:"Incorrect Credentials"
  })

  }
  
    
})

adminRouter.post("/course",adminMiddleware ,async (req, res)=>{
    adminId = req.userId;
    const{ title , discription, imageUrl,price } = req.body;

   const course = await courseModel.create({
        title:title,
        discription:discription,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId 
    })
    res.json({
        message:"Course Created",
        courseId:course._id
    })
})

adminRouter.put("/course",()=>{

    res.json({
        message:"Admin log in page"
    })
})

adminRouter.get("/course/bulk",()=>{

    res.json({
        message:"Admin log in page"
    })
})

module.exports={
    adminRouter:adminRouter
}