const{ Router } = require("express");
const{ userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../Config");
const { userMiddleware } = require("../Middleware/user");
const { purchaseModel } = require ("../db");
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

userRouter.post("/signin",async (req,res)=>{
const {email , password} = req.body;

const user = await userModel.findOne({
    email:email,
    password:password
})

if(user){
    const token = jwt.sign({
        id:user._id
    },JWT_USER_PASSWORD)

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

userRouter.get("/purchases",userMiddleware,async (req,res)=>{
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
});

module.exports={
    userRouter:userRouter
}


