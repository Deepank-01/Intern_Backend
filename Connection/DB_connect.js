const mongoose=require("mongoose")
require("dotenv").config()
const DB_connect = async () => {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }) 
      console.log("Connection to MongoDB is successful")
    } catch (err) {
      console.log("There is an error:", err)
      process.exit(1)  // Exit the process if connection fails
    }
  }

module.exports=DB_connect

 