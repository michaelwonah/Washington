const mongoose = require('mongoose')

const bookingFormSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
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
    address: {
        type: String,
        required: true,
        trim: true
    },
    pickupDate: {
        type: String,
        required: true
    },
    pickupTime: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        enum:["basic", "deluxe", "premium"],
        default: "basic",
        trim: true
    },
     specialInstruction: {
        type: String,
        required: true,
        trim: true
    },
});

const bookingFormModel = mongoose.model('bookingFormInfo', bookingFormSchema)

module.exports = bookingFormModel;
