const express=require("express")
const router=express.Router();
const{Register_Company}=require("../Controller/Register")
const{LoginCompany}=require("../Controller/Login")
const{getAllDetails_company}=require("../Controller/Details");
const { isCompany, auth } = require("../middlewares/auth");
const { Shortlisting_student } = require("../Controller/ShortlIst_student");
// routes
router.post("/register",Register_Company)
router.post("/login",LoginCompany)
router.get("/details",auth,isCompany,getAllDetails_company)
router.post("/shortlisting",auth,isCompany,Shortlisting_student)
module.exports=router