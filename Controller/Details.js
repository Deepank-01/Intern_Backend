const Admin= require("../Model/Admin");
const Company = require("../Model/Company");
const Student = require("../Model/Student");

exports.getAllDetails_admin=async(req,res)=>{
    try{
    const admin_id=req.user.id 
    console.log("The college id is  : ",admin_id)
    const admin_info = await Admin.findById(admin_id)
    .populate({
        path: "student",
        select: "id firstName lastName email applied_companies selected_for_companies",
        populate: [
            {
                path: "applied_companies",
                select: "id name jd email applied_student shortlisted_student phone"
            },
            {
                path: "selected_for_companies",
                select: "id name jd email applied_student shortlisted_student phone"
            }
        ]

    })
    .populate({
        path:"Requested_company",
        select:"id  name email jd  phone"
    })
    .populate({
        path:"Approved_company",
        select:"id  name email jd phone"
    })
    .exec();
    // console.log("clg details are ",admin_info)
    if (!admin_info) {
        return res.status(404).json({
            success: false,
            message: "Admin not found"
        }); 
    }
    return res.status(200).json({
        success:true,
        message:" College details are : ",
        College_details:admin_info
    })


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error in the code in getting the details of the admin ",
          error:err.message
        })
    }
}


exports.getAllDetails_company=async(req,res)=>{
    try{
    const company_id=req.user.id 
    // console.log(company_id)
    const college_id=req.user.college_id
    // console.log("The college id is  : ",admi_id)
    const company_info = await Company.findById(company_id)
    .populate({
        path: "college",
        select: " id name email "
    })
    .populate({
        path: "applied_student",
        select: "id email firstName lastName Resume"
    })
    .populate({
        path: "shortlisted_student",
        select: "id  email firstName lastName Resume"
    })
    
    .exec();
    // console.log("clg details are ",company_info)
    if (!company_info) {
        return res.status(404).json({
            success: false,
            message: "Company not found",
            company_id,
            company_info
        }); 
    }
    return res.status(200).json({
        success:true,
        message:" Comapny details are : ",
        College_details:company_info
    })


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error in the code in getting the details of the college  ",
          error:err.message
        })
    }
}




exports.getAllDetails_student=async(req,res)=>{
    try{
    const student_id=req.user.id 
    // console.log(student_id)
    const college_id=req.user.college_id
    // console.log("The college id is  : ",admi_id)
    const student_info = await Student.findById(student_id)
    .populate({
        path: "college",
        select: " id name email Approved_company ",
        populate: {
            path: "Approved_company",
            select: "id name jd email logo " // Add any other fields you want from the Approved_company
        }
    })
    .populate({
        path: "applied_companies",
        select: "id email name jd"
    })
    .populate({
        path: "selected_for_companies",
        select: "id  email name jd"
    })
    .exec();

  
    // console.log("clg details are ",student_info)
    if (!student_info) {
        return res.status(404).json({
            success: false,
            message: "Company not found",
            student_id,
            student_info
        }); 
    }
      // approved companies to be shown using admin/clg db 

      const college_info=await Admin.findById(college_id)
     
      if (!college_info) {
        return res.status(404).json({
            success: false,
            message: "college not found or registered ",
        }); 
    }


    return res.status(200).json({
        success:true,
        message:" Comapny details are : ",
        studentdetails:student_info
    })


    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Error in the code in getting the details of the student  ",
          error:err.message
        })
    }
}