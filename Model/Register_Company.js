const mongoose=require("mongoose")

const Company_Schema=mongoose.Schema({
  Requested:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    }
  ,
  Approved:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    }
  

})

module.exports=mongoose.model("Register_Company",Company_Schema)