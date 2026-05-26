const mongoose = require('mongoose')

const pickupDeliverySchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderInfo',
        required: true,
        unique: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'inprogress', 'completed'],
        default: 'scheduled',
    }
}, { timestamps: true })

const pickupDeliveryModel = mongoose.model('pickupDeliveryInfo', pickupDeliverySchema)

module.exports = pickupDeliveryModel
