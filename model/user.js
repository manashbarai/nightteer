const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

  name:String,
  email:String,
  password:String,
  emailVerified:{
    type:Boolean,
    default:false
  },
  role:Number

}, { timestamps: true })

const User = mongoose.model("User", UserSchema)
module.exports = User;