const express=require("express")
const router=express.Router();
const{LoginSuperAdmin}=require("../Controller/Login")

const{CreateAdmin}=require("../Controller/Super_Admin")
const {auth,isSuperAdmin}=require("../middlewares/auth");

// routes
router.post("/login",LoginSuperAdmin)  // for the login 
router.post("/createAdmin",auth,isSuperAdmin,CreateAdmin)

module.exports=router