const Admin=require("../Model/Admin")
const Company = require("../Model/Company")
const mailsender = require("../utils/mailsender")

exports.Approving_company=async(req,res)=>{
    try{
         const admin_id=req.user.id 
         const {company_id}=req.body  // from front-end
         const company_info=await Company.findById(company_id)
         const result=await Admin.updateOne(
              {_id:admin_id},{$pull:{ Requested_company:company_id}}    
        )
        if(result.modifiedCount>0){
            try{

                const updated_admin=await Admin.findByIdAndUpdate(
                    admin_id ,{$push:{Approved_company:company_id}},{new:true}
                )
                // const mail=await mailsender(company_info.email,"Approved",`Congrates your company approved by the ${updated_admin.name} plesae login to website ` )
                return res.status(200).json({
                    success:true,
                    message:"Approved the company successfully",
                    data:updated_admin
                })
            }

            catch(err){
                return res.status(403).json({
                    success:false,
                    message:"Error in the code of the updated_admin inside the approving_company inside the if ",
                    error:err.message
                })
            }
            
        }
        
        return res.status(403).json({
            success:false,
            message:"Error in the code of the updated_admin inside the approving_company outside if  ",
            
        })
        

    }
    catch(err){
        return res.status(403).json({
            success:false,
            message:"Error in the code of the updated_admin ",
            error:err.message
        })
    }
}