const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: {
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
        trim: true
    },
    pickupDate: {
        type: String,
        trim: true
    },
    pickupTime: {
        type: String,
        trim: true
    },
    serviceType: {
        type: String,
        enum: ["basic", "deluxe", "premium"],
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
        trim: true
    }
});

const orderModel = mongoose.model('orderInfo', orderSchema)

module.exports = orderModel;
