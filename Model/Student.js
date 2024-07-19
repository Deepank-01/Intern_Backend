const mongoose=require("mongoose")

const Student_Schema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
        lowercase:true
    },
    lastName:{
        type:String,
        required:true,
         lowercase:true
    },

    college:{   // admin refers to the collge only  
         type:mongoose.Schema.Types.ObjectId,
         ref:"Admin",
         required:true
    },

    applied_companies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company"
        }
    ],
   selected_for_companies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Company"
        }  
    ],
    Resume:{
        type:String
    },
   
  
})

module.exports=mongoose.model("Student",Student_Schema)