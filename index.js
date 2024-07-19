express=require("express")
app=express()

const { json } = require("body-parser")
var cookieParser = require('cookie-parser')

// necressary imports
const DB_connect=require("./Connection/DB_connect")
const student_routes=require("./routes/Student_routes")
const company_routes=require("./routes/Company_routes")
const SuperAdmin =require("./Model/SuperAdmin")
const superadmin_routes=require("./routes/SuperAdmin_routes")
const Admin_routes=require("./routes/Admin_routes")

// requirements
require("dotenv").config()
const PORT=process.env.PORT || 3000


// middlewares
app.use(json())
app.use(cookieParser())


// Routers
app.use("/student",student_routes)
app.use("/company",company_routes)
app.use("/superadmin",superadmin_routes)
app.use("/college-admin",Admin_routes)
// 3rd party connection
DB_connect()

app.listen(PORT,()=>{
    console.log("The app start successful at port ", PORT)
})

app.get("/",(req,res)=>{
    res.send("<h1>Home page</h1>")
}) 
app.post("/superadmin",async(req,res)=>{
    try{
        const {email,password}=req.body
        const super_user=await  SuperAdmin.create({
            email,password
        })
        return res.status(200).json({
            message:"Created the super user",
        })
    }
    catch(err){
        return res.status(400).json({
            message:"Error in creation of  the super user",
            error:err.message
        })
    }

})