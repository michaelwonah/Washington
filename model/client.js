const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
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
    address: {
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
     isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    },
    otpExpire:{
        type: Date,
         default: ()=>{
        return Date.now() + (1000*60*7)
}
    },
});

const clientModel = mongoose.model('clientInfo', clientSchema)

module.exports = clientModel;
