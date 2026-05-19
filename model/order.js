const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'bookingFormInfo'
    },
    firstName: {
        type: String,
        required: true,
    },
    surname: {
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
        trim: true
    },
    assignedDriver: {
        type: String,
        trim: true
    },
    serviceType: {
        type: String,
        enum:["basic", "deluxe", "premium"],
        default: "basic",
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    servicePackage: {
        type: String,
        enum:["individual service", "packaged"],
        default: "individual service",
        trim: true
    },
    amount: {
        type: String,
        trim: true
    },
    status:{
        type: String,
        enum:["assigned", "request", "processing", "ready", "delivered", "cancelled"],
        default: "request",
        trim: true
    },
});

const orderModel = mongoose.model('orderInfo', orderSchema)

module.exports = orderModel;
