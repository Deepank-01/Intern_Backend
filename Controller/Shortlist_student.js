// Contorlleer used to aprove the student for the interview

const Company = require("../Model/Company")
const Student = require("../Model/Student")
const mailsender = require("../utils/mailsender")

exports.Shortlisting_student=async(req,res)=>{
    try{
        const company_id=req.user.id
        const{student_id}=req.body // the data from the front-end or if using the parameter use the req.params.id
        const student_info =await Student.findById(student_id)
        if(!student_info){
             return res.status(404).json({
                success:false,
                message:"Not avible to find the student , either student id is wrong or something went wrong"
             })
        }
//         const result_company=await Company.updateOne(
//             {_id:company_id},{$pull:{applied_student:student_id}}    
//       )
//       const result_student=await Student.updateOne(
//         {_id:student_id},{$pull:{applied_companies:company_id}}    
//   )

      
        const is_student_applied=await Company.findOne({
            _id:company_id,
            applied_student:{$elemMatch:{$eq:student_id}}
        })
        const is_student_shortlisted=await Company.findOne({
             _id:company_id,
            shortlisted_student:{$elemMatch:{$eq:student_id}}
        })

        if(is_student_applied && !is_student_shortlisted){
              // the student exits and removed from the applied student
            const update_company=await Company.findByIdAndUpdate(
                company_id,{$push:{shortlisted_student:student_id}}
            )
    
            const update_student=await Student.findByIdAndUpdate(
                student_id,{$push:{selected_for_companies:company_id}}
            )
            const mail=mailsender(
                update_student.email,
                "Congratulations for been ShortListed",
                `We are Glad to tell you that you are shortlisted by ${update_company.name} for the interview.`)
             return res.status(200).json({
                success:true,
                message:"Successfully ShortListed the student",
             })
           
        }
        else if(!is_student_applied){
            return res.status(404).json({
                success:false,
                message:"Student did not applied check the student id"
            })
        }
  
       
      return res.status(404).json({
        success:false,
        message:"Already Canditate is shortlisted"
      })

    }
    catch(err){
        return res.status(404).json({
            success:false,
            message:"Error in the code of the Approved Student ",
            error:err.message
          })
    }
}