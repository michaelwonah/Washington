const bookingFormModel = require('../model/bookingForm')
const orderModel = require('../model/order')
require('dotenv').config()

exports.createOrder = async(req, res)=>{
    try {
        const {firstName, surname, email, phoneNumber, address, assignedDriver, serviceType, servicePackage} = req.body

        const existingOrder = await orderModel.findOne({ email: email.toLowerCase() })
        if (existingOrder) {
            return res.status(400).json({
                message: 'The order already exists'
            })  
        }
        const NewOrder = new orderModel({
            firstName,
            surname,
            email: email.toLowerCase(),
            phoneNumber,
            address,
            assignedDriver,
            serviceType,
            servicePackage
        })

        await NewOrder.save()
        res.status(201).json({
            message:"New order Created",
            data:NewOrder
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.assignedOrder = async(req, res) => {
    try {
        const adminId = req.user.id;
        const { orderId } = req.params;
        const order = await orderModel.findById(ordertId)
        if (!order){
            return res.status(404).json({
                message: 'Order not found'
            })
        }

        if (order.status === 'assigned' || order.status === 'ready'){
            return res.status(400).json({
                message: 'Order already processed'
            })
        }

        console.log('order ID', order.bookingId)
        const booking = await bookingFormModel.findById(order.bookingId)
        console.log('Booking', booking)
        if(!booking){
            return res.status(404).json({
                message: 'Booking is not existing'
            })
        }

        order.status = 'assigned';


        await booking.save()
        await order.save();

        res.status(200).json({
            message: 'order assigned successfully',
            data: order
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
