const mongoose=require("mongoose")

const SuperAdmin_Schema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    admin:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    }]
  
})

module.exports=mongoose.model("SuperAdmin",SuperAdmin_Schema)