const SuperAdmin=require("../Model/SuperAdmin")

var randomstring = require("randomstring");
const Admin = require("../Model/Admin");
// const bcrypt = require('bcrypt');

exports.CreateAdmin=async(req,res)=>{
    try{
      const {email,password,name}=req.body
      const super_id=req.user.id
      if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const is_admin=await Admin.findOne({email})
    if(is_admin){
        return res.status(400).json({
            success: false,
            message: "Admin Already exits ",
        });
    }



    var unique_id=randomstring.generate({
        length: 12,
        charset: 'alphabetic'
      })
    //   check unique

    var is_clg_id=await Admin.findOne({college_unique_Key:unique_id})
     while(is_clg_id){
        unique_id=randomstring.generate({
            length: 12,
            charset: 'alphabetic'
          })
          is_clg_id=await Admin.findOne({college_unique_Key:unique_id})
     }

    // db entry
    const admin_info=await Admin.create({
        email:email,password:password,name:name,college_unique_Key:unique_id
    })
    const admin_id=admin_info._id
//    additing in  the super admin array 
const super_admin_update=await SuperAdmin.findByIdAndUpdate(super_id,
    { $push: {admin : admin_id } },
    {new:true}
)
    return res.status(200).json({
        success: true,
        message: "Created the Amdim successfully ",
        admin:admin_info
    });


    }
    catch(err){
        return res.status(200).json({
            success: false,
            message: " error in the code  of creating the admin",
            error:err.message
        });

    }
}


// Todo: Update the deatials of the admin