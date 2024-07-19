const express=require("express")
const router=express.Router();
const {Register_student}=require("../Controller/Register");
const { auth, isStudent } = require("../middlewares/auth");
const { LoginStudent } = require("../Controller/Login");
const { getAllDetails_student } = require("../Controller/Details");
const { Apply_companies } = require("../Controller/Apply_company");
// routers
router.post("/register",Register_student)
router.post("/login",LoginStudent)
router.get("/details",auth,isStudent,getAllDetails_student)
router.post("/apply-company",auth,isStudent,Apply_companies)
module.exports=router