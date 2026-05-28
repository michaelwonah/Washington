const mongoose = require('mongoose');

const bookingFormSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    surName: {
        type: String,
        required: true,
        trim: true
    },
    assignedDriver: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        required: true,
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
    amount: {
        type: Number,
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
    servicePackage: {
        type: String,
        enum: ["individual service", "packaged service"],
        default: "individual service",
        trim: true
    },
     specialInstruction: {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: ["assigned", "request", "ready", "delivered", "cancelled"],
        default: "request",
        trim: true
    }
});

const bookingFormModel = mongoose.model('bookingFormInfo', bookingFormSchema)

module.exports = bookingFormModel;
