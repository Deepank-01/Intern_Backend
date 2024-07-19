const mongoose=require("mongoose")

const Admin_Schema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    college_unique_Key:{
       type:String,
       required:true
    },
    Description:{
        type:String,
        trim:true
    },
    logo:{   // use the third party application like cloudniary for this 
        type:String
    },
    student:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student"
        }
    ],
    Requested_company:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company" 
    }],
    Approved_company:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company" 
    }],
})

module.exports=mongoose.model("Admin",Admin_Schema)