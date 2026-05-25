const bookingFormModel = require('../model/bookingForm')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const orderModel = require('../model/order')
const customerModel = require('../model/customer')
require('dotenv').config()


exports.allCustomer = async (req, res) => {
    try {
        const customer = await orderModel.find()
        res.status(200).json({
            message: 'All customers retrieved',
            data: customer,
            count: customer.length
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.allActiveCustomer = async (req, res) => {
    try {
        const activeCustomers = await orderModel.aggregate([
            {
                $group: {
                    _id: "$email",
                    firstName: { $first: "$firstName" },
                    surname: { $first: "$surname" },
                    email: { $first: "$email" },
                    phoneNumber: { $first: "$phoneNumber" },
                    address: { $first: "$address" },
                    totalOrders: { $sum: 1 }
                }
            },
            {
                $match: {
                    totalOrders: { $gt: 19 }
                }
            },
            {
                $addFields: {
                    status: "active"
                }
            }
        ])

        res.status(200).json({
            message: "Active customers retrieved",
            data: activeCustomers,
            count: activeCustomers.length
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.allInactiveCustomer = async (req, res) => {
    try {
        const inactiveCustomers = await orderModel.aggregate([
            {
                $group: {
                    _id: "$email",
                    firstName: { $first: "$firstName" },
                    surname: { $first: "$surname" },
                    email: { $first: "$email" },
                    phoneNumber: { $first: "$phoneNumber" },
                    address: { $first: "$address" },
                    totalOrders: { $sum: 1 }
                }
            },
            {
                $match: {
                    totalOrders: { $lte: 19 }
                }
            },
            {
                $addFields: {
                    status: "inactive"
                }
            }
        ])

        res.status(200).json({
            message: "Inactive customers retrieved",
            data: inactiveCustomers,
            count: inactiveCustomers.length
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
