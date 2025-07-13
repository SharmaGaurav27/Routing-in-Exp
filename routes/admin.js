const { Router } = require("express");
const adminRouter = Router();
const JWT_ADMIN_PASSWORD = "Kaushal12345"
const jwt = require("jsonwebtoken");

const { adminModel} = require("../db");

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

adminRouter.post("/course",(req, res)=>{

    res.json({
        message:"Admin log in page"
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