const express=require("express")
const router=express.Router();

const {Register_college}=require("../Controller/Register")
const{LoginAdmin}=require("../Controller/Login")
const{getAllDetails_admin}=require("../Controller/Details")
const{auth,isAdmin}=require("../middlewares/auth");
const { Approving_company } = require("../Controller/Approving_Company");
// routes
// router.post("/register",Register_college)
router.post("/login",LoginAdmin)
router.get("/details",auth,isAdmin,getAllDetails_admin)
router.post("/approve-company",auth,isAdmin,Approving_company)

module.exports=router 