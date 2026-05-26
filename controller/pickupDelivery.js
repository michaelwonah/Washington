const mongoose = require('mongoose')
const pickupDeliveryModel = require('../model/pickupDelivery')
const orderModel = require('../model/order')

exports.createPickupDelivery = async (req, res) => {
    try {
        const { orderId, clientName, contact, status } = req.body

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                message: 'Valid order id is required'
            })
        }

        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            })
        }

        const pickupDelivery = await pickupDeliveryModel.create({
            orderId,
            clientName,
            contact,
            status
        })

        res.status(201).json({
            message: 'Pickup and delivery created successfully',
            data: pickupDelivery
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.allPickupDeliveries = async (req, res) => {
    try {
        const pickupDeliveries = await pickupDeliveryModel
        .find()
        .populate('orderId')
        .sort ({ createdAt: -1 })

        res.status(200).json({
            message: 'Pickup and deliveries fetched successfully',
            data: pickupDeliveries,
            count: pickupDeliveries.length
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.onePickupDelivery = async (req, res) => {
    try {
        const { pickupDeliveryId } = req.params

        if (!mongoose.Types.ObjectId.isValid(pickupDeliveryId)) {
            return res.status(400).json({
                message: 'Valid pickup and delivery id is required'
            })
        }

        const pickupDelivery = await pickupDeliveryModel.findById(pickupDeliveryId).populate('orderId')
        if (!pickupDelivery) {
            return res.status(404).json({
                message: 'Pickup and delivery not found'
            })
        }

        res.status(200).json({
            message: 'Pickup and delivery fetched successfully',
            data: pickupDelivery
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updatePickupDeliveryStatus = async (req, res) => {
    try {
        const { pickupDeliveryId } = req.params
        const { status } = req.body

        if (!mongoose.Types.ObjectId.isValid(pickupDeliveryId)) {
            return res.status(400).json({
                message: 'Valid pickup and delivery id is required'
            })
        }

        const pickupDelivery = await pickupDeliveryModel.findByIdAndUpdate(
            pickupDeliveryId,
            { status },
            { new: true, runValidators: true }
        )

        if (!pickupDelivery) {
            return res.status(404).json({
                message: 'Pickup and delivery not found'
            })
        }

        res.status(200).json({
            message: 'Pickup and delivery status updated successfully',
            data: pickupDelivery
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deletePickupDelivery = async (req, res) => {
    try {
        const { pickupDeliveryId } = req.params

        if (!mongoose.Types.ObjectId.isValid(pickupDeliveryId)) {
            return res.status(400).json({
                message: 'Valid pickup and delivery id is required'
            })
        }

        const pickupDelivery = await pickupDeliveryModel.findByIdAndDelete(pickupDeliveryId)
        if (!pickupDelivery) {
            return res.status(404).json({
                message: 'Pickup and delivery not found'
            })
        }

        res.status(200).json({
            message: 'Pickup and delivery deleted successfully',
            data: pickupDelivery
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
