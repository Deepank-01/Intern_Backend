const Company = require("../Model/Company")
const Student = require("../Model/Student")


exports.Apply_companies=async(req,res)=>{
    try{
          const student_id=req.user.id
          const {company_id}=req.body
        //   validtion
        const student_info=await Student.findById(student_id)
        const company_info=await Company.findById(company_id)
        if(!company_info){
            return res.status(404).json({
                success:false,
                message:"incorrect company id "
            })

        }
        // matching the id's
        const match=await Company.findOne(
          {college:student_info.college,_id:company_id})
        if(!match){
          return res.status(403).json({
            success:false,
            message:"Your college do not have access to this company "
        })
        }
    
          //  check for the previous apply
          const prev_apply=await Student.findOne({
            _id:student_id,
            applied_companies:{$elemMatch: { $eq:company_id }}
          }).exec()
          if(!prev_apply){
            const updated_student=await Student.findByIdAndUpdate(
              student_id,{$push:{applied_companies:company_id}},{new:true}
            )
  
            const update_company=await Company.findByIdAndUpdate(
              company_id ,{$push:{applied_student:updated_student._id}},{new:true}
            )
            return res.status(200).json({
              success:true,
              message:"successfull added the compny in to apllied company  "
          })
          }
          else{
            return res.status(403).json({
              success:false,
              message:"Already applied for this company  "
          })
          }
          

         
    }
    catch(err){
        return res.status(404).json({
            success:false,
            message:"Error in the code of the apply companies",
            error:err.message
        })

    }
}