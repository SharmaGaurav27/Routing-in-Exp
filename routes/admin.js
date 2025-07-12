const { Router } = require("express");
const adminRouter = Router();

const { adminModel} = require("../db");

//adminRouter.use(adminMiddleware)
adminRouter.post("/signup",()=>{

    res.json({
        message:"Admin log in page"
    })
})

adminRouter.post("/sigin",()=>{

    res.json({
        message:"Admin log in page"
    })
})

adminRouter.post("/course",()=>{

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