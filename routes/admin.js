const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const{  courseModel } = require("../db");
const jwt = require("jsonwebtoken");
// brcypt, zod, jsonwebtoken
const  { JWT_ADMIN_PASSWORD } = require("../Config");
const { adminMiddleware } = require("../middleware/admin");

//adminRouter.use(adminMiddleware)
adminRouter.post("/signup",async (req, res)=>{
     const { email, password, firstName, lastName } = req.body; // add zod validation 
        // hash the password here so palintext pass is not stored in database
    
            await adminModel.create({
                email: email,
                password: password,
                firstName: firstName, 
                lastName: lastName,
            })
        
        res.json({
            message:"Signup Succeeded"
        })
})

adminRouter.post("/signin",async(req, res)=>{
    const {email , password} = req.body;

   const admin = await adminModel.findOne({
    email:email,
    password:password
   });

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
    const adminId = req.userId;
    const{ title , description, imageUrl,price } = req.body;

   const course = await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId 
    })
    res.json({
        message:"Course Created",
        courseId:course._id
    })
})

adminRouter.put("/course",adminMiddleware ,async(req,res)=>{
   const adminId = req.userId;
    const{ title , description, imageUrl,price, courseId } = req.body;

   const course = await courseModel.updateOne({
    _id:courseId,
    creatorId:adminId
   },
    {
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
    })
    res.json({
        message:"Course Updated",
        courseId:course._id
    })
    
})

adminRouter.get("/course/bulk",adminMiddleware,async (req, res)=>{
     const adminId = req.userId;
   const courses  = await courseModel.find({
    creatorId:adminId
});
   
    res.json({
        message:"Course Updated",
        courses
    })
})

module.exports={
    adminRouter:adminRouter
}