const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    totalOrder: {
        type: String,
        trim: true
    },
    totalSpent: {
        type: String,
        trim: true
    },
    status:{
        type: String,
        enum:["active", "inactive"],
        default: "inactive",
        trim: true
    },
});

const customerModel = mongoose.model('customerInfo', customerSchema)

module.exports = customerModel;
