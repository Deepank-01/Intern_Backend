const Student =require("../Model/Student")
const Company=require("../Model/Company")
const Register_Companies=require("../Model/Register_Company")
const bcrypt = require('bcrypt');

const Admin = require("../Model/Admin");
const mailsender = require("../utils/mailsender");

//  Register for the student in DB for the first time without the college
//  Todo verfication bases on the college is present or not in the DB
exports.Register_student=async(req,res)=>{

    try{
        const {firstName,lastName,email,password,clg_id}=req.body
        
        if (!firstName || !lastName || !email || !password || !clg_id) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }
        const student_info= await Student.findOne({email})
        
        if(student_info){
            return res.status(403).json({
                success:false,
                message:"Student already exits"
            })
        }
        const clg_info=await Admin.findById(clg_id)
        if(!clg_info){
            return res.status(403).json({
                success:false,
                message:"Incorrect college id"
            })
        }
        // entering into the db
        const user_info=await Student.create({firstName:firstName,lastName:lastName,email:email,password:password,college:clg_id})

        //  updating the admin/clg db
        const updated_clg=await Admin.findByIdAndUpdate(clg_id,{$push:{student:user_info._id}},{new:true})

        const mail=await mailsender(email,"Welcome  to Salahkart",`Welcome ${firstName} to salahkart you are registered as student 
            under the college ${clg_info.name} and the college id as ${clg_id}`)



        return res.status(200).json({
            success:true,
            message:"Successfully enter the user in the Db",
            student:user_info
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong. Error in the student Register code ",
            error:err.message
        })
    }
}


//  Company registration 

exports.Register_Company=async(req,res)=>{
    try{
        const {email,password,name,phone,clg_id}=req.body
        // validtion
        if (!name || !email || !password || !clg_id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        // cehck whether the same company exits for a particular clg 
      const existing_company=await  Company.findOne({email})
    
      if(existing_company && await Company.findOne({college:{$eq:clg_id}})){
        return res.status(403).json({
            success:false,
            message:"Company already exits"
        })
    }
   



    const Company_info=await Company.create({
        name:name,password:password,email:email,phone:phone,college:clg_id
    })
    //   adding to the clg database
    const college_update=await Admin.findByIdAndUpdate(clg_id,{$push:{Requested_company:Company_info._id}},{new:true})
    
    // Mail send to the company
    // todo: when the orginal mail are present
    // const mail=mailsender(Company_info.email,"Successfully Register",`Welcome to Salahkart  . You are registered for ${college_update.name} with college id of ${college_update._id} `)
    // const mail_college=mailsender(college_update.email,"Company Registered ",`Welcome to Salahkart  .  ${Company_info.name} have requested for the placement srive `)
   return res.status(200).json({
    success:true,
    message:"Successfully enter the user in the Db",
    company:Company_info
})

        
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong. Error in the College Register code ",
            error:err.message
        })
    }
}


 