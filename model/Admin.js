const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true  
    },
    lastName: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
     otp: {
      type: String,
      trim: true,
      default: () => {
        return Math.round(Math.random() * 1e6)
          .toString()
          .padStart(6, "0");
      },
    },
    profilePicture: {
        secureUrl: {
        type: String,
        trim: true
        },
        publicId: {
       type: String,
        trim: true
        }
    },
     isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "admin",
    },
    otpExpire:{
        type: Date,
         default: ()=>{
        return Date.now() + (1000*60*7)
}
    },
});

const adminModel = mongoose.model('adminInfo', adminSchema)

module.exports = adminModel; 
