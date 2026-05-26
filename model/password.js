const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adminInfo',
        required: true
    },
    changedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

const passwordModel = mongoose.model('passwordInfo', passwordSchema)

module.exports = passwordModel
