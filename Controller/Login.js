const Admin = require("../Model/Admin");
const Company = require("../Model/Company");
const Student = require("../Model/Student");
const SuperAdmin=require("../Model/SuperAdmin")
var jwt = require('jsonwebtoken');
require("dotenv").config()

exports.LoginSuperAdmin=async(req,res)=>{
    try{
       const {email,password}=req.body
    //    validation
       if ( !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // checking the data
    const user=await SuperAdmin.findOne({email})
   if(!user){
    return res.status(400).json({
        success: false,
        message: "Email is incorrect "
    });
   }

    if(user && user.password==password){
        // jwt token 
       var payload={
            role:"superadmin",
            id:user._id,
            name:"SalahKart Admin"
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
        option={
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,

        }
        user.password=null
       return res.cookie("token",token,option).status(200).json({
            message:"Succesfully login the user",
            success:true,
            user,
            token,
        })
    }

    return res.status(400).json({
        success: false,
        message: "Password incorrect"
    });
       
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Error in the code of the login  ",
            error:err.message
        });
    }
}

exports.LoginAdmin=async(req,res)=>{
    try{
        const {email,password}=req.body
     //    validation
        if ( !email || !password) {
         return res.status(400).json({
             success: false,
             message: "All fields are required"
         });
     }
 
     // checking the data
     const user=await Admin.findOne({email})
    if(!user){
     return res.status(400).json({
         success: false,
         message: "Email is incorrect"
     });
    }
 
     if(user && user.password==password){
         // jwt token 
        var payload={
             role:"admin",
             id:user._id,
             name:user.name
         }
         const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
         option={
             expires: new Date(Date.now() + 3*24*60*60*1000),
             httpOnly:true,
 
         }
         user.password=null
        return res.cookie("token",token,option).status(200).json({
             message:"Succesfully login the user",
             success:true,
             user,
             token,
         })
     }
 
     return res.status(400).json({
         success: false,
         message: "Password incorrect"
     });
        
     }

     catch(err){
        return res.status(400).json({
            success: false,
            message: "Error in the code of the login of the Admin  ",
            error:err.message
        });
    }

}

exports.LoginCompany=async(req,res)=>{
    try{
        const {email,password,clg_id}=req.body

     //    validation
        if ( !email || !password || !clg_id) {
         return res.status(404).json({
             success: false,
             message: "All fields are required",
             email,
             password,
             clg_id
         });
     }
 
     // checking the data
     const user=await Company.findOne({email:email,college:clg_id})
     .populate({
        path:"college",
        select:"id name email "
    })
    if(!user){
     return res.status(403).json({
         success: false,
         message: "Email  or college id is incorrect"
     });
    }
 
     if(user && user.password==password){
         // jwt token 
        var payload={
             role:"company",
             id:user._id,
             name:user.name,
             college_id:user.college
         }
         const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
         option={
             expires: new Date(Date.now() + 3*24*60*60*1000),
             httpOnly:true,
 
         }
         user.password=null
        return res.cookie("token",token,option).status(200).json({
             message:"Succesfully login the user",
             success:true,
             user,
             token,
         })
     }
 
     return res.status(400).json({
         success: false,
         message: "Password incorrect"
     });
        
     }

     catch(err){
        return res.status(400).json({
            success: false,
            message: "Error in the code of the login of the company  ",
            error:err.message
        });
    }

}

exports.LoginStudent=async(req,res)=>{
    try{
        const {email,password,clg_id}=req.body

        //    validation
           if ( !email || !password || !clg_id) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
                email,
                password,
                clg_id
            });
        }
        const user=await Student.findOne({email:email})
        .populate({
            path:"college",
            select:"id name email "
        })
        if(!user){
            return res.status(403).json({
                success: false,
                message: "Email is incorrect"
            });
           }
           if(user && user.password==password){
            // jwt token 
           var payload={
                role:"student",
                id:user._id,
                name:user.name,
                college_id:user.college
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
            option={
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
    
            }
            user.password=null
           return res.cookie("token",token,option).status(200).json({
                message:"Succesfully login the user",
                success:true,
                user,
                token,
            })
        }
        return res.status(400).json({
            success: false,
            message: "Password incorrect"
        });


    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: "Error in the code of the login of the student  ",
            error:err.message
        });
    }
}