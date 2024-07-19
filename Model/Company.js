const mongoose=require("mongoose")

const Company_Schema=mongoose.Schema({
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
        required:true,
        lowercase:true
    },
    phone:{
        type:String,
        required:true,
    },
    college :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true
    },
    jd:{ // todo :use the third party application for the connection with the jd  pdf 
     type:String,
    },
    logo:{ // todo :use the 3rd party for the logo 
        type:String,
    },
    applied_student:[
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student"
          }
    ],
    shortlisted_student:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Student"
          }
    ]
    

})

module.exports=mongoose.model("Company",Company_Schema)