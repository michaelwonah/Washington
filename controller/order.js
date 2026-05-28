const bookingFormModel = require('../model/bookingForm')
const orderModel = require('../model/order')
const adminModel = require('../model/Admin')
const mongoose = require('mongoose')
require('dotenv').config()

exports.createOrder = async (req, res) => {
  try {
    const { name, surname, email, phoneNumber, address, assignedDriver, pickupDate, pickupTime, serviceType, servicePackage, amount, specialInstruction } = req.body
    const fullName = `${name} ${surname}`
    const NewOrder = new orderModel({
      name: fullName,
      email,
      phoneNumber,
      address,
      assignedDriver,
      pickupDate,
      pickupTime,
      serviceType,
      servicePackage,
      amount,
      specialInstruction
    })

    await NewOrder.save()
    res.status(201).json({
      message: "New order Created",
      data: NewOrder
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.assignedOrder = async (req, res) => {
  try {
    // const adminId = req.user.id;
    const { bookingId } = req.params;
    const { assignedDriver } = req.body

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        message: 'Valid booking id is required'
      })
    }

    const booking = await bookingFormModel.findById(bookingId)

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found'
      })
    };

    const order = Object.assign(booking, {
      assignedDriver
    })
    const { _id, __v, ...data } = order.toObject()
    const newOrder = await orderModel.create(data)

    await bookingFormModel.findByIdAndDelete(bookingId)
    res.status(201).json({
      message: 'order assigned successfully',
      data: newOrder
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
exports.readyOrder = async (req, res) => {
  try {
    // const adminId = req.user.id;
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)
    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }

    if (order.status === 'ready') {
      return res.status(400).json({
        message: 'Order already marked for ready'
      })
    }

    order.status = 'ready';
    await order.save();

    res.status(200).json({
      message: 'order is ready',
      data: order
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
exports.deliveredOrder = async (req, res) => {
  try {
    // const adminId = req.user.id;
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId)
    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      })
    }

    if (order.status === 'delivered') {
      return res.status(400).json({
        message: 'Order already delivered'
      })
    }

    order.status = 'delivered';
    await order.save();

    res.status(200).json({
      message: 'order delivered',
      data: order
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.cancelledOrder = async (req, res) => {
  try {
    // const adminId = req.user.id;
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        message: 'Valid booking id is required'
      })
    }

    const booking = await bookingFormModel.findById(bookingId)
    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found'
      })
    };

    await bookingFormModel.findByIdAndDelete(bookingId)

    res.status(200).json({
      message: 'Booking is cancelled',
      data: booking
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find()

    const processing = await orderModel.aggregate([
      {
        $match: {
          status: { $in: ["assigned", "ready"] }
        }
      },
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 }
        }
      }
    ]);

    const totalProcessing = processing.reduce((acc, cur) => acc + cur.total, 0)
    

    const delivered = await orderModel.countDocuments({ status: "delivered" })

    const amount = orders.reduce((acc, cur) => acc + cur.amount, 0)

    res.status(200).json({
      message: 'Orders fetched successfully',
      data: {
        allOrders: orders,
        processing,
        delivered,
        amount
      }
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.oneOrder = async (req, res) => {
  try {
    const { search } = req.query

    const query = {
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { surname: { $regex: search, $options: "i" } },
        { contact: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    };

    const order = await orderModel.findOne(query);
    res.status(200).json({
      message: "Order successfully retrieved",
      data: order
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}
