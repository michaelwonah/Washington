const bookingFormModel = require('../model/bookingForm')
require('dotenv').config()

exports.bookLaundry = async(req, res)=>{
    try {
        const {firstName, surname, email, phoneNumber, address, pickupDate, pickupTime,serviceType, specialInstruction} = req.body

        const existingbooking = await bookingFormModel.findOne({ email: email.toLowerCase() })
        if (existingbooking) {
            return res.status(400).json({
                message: 'The booking already exists'
            })  
        }
        const Newbooking = new bookingFormModel({
            firstName,
            surname,
            email: email.toLowerCase(),
            phoneNumber,
            address,
            pickupDate,
            pickupTime,
            serviceType,
            specialInstruction
        })

        await Newbooking.save()
        res.status(201).json({
            message:"New booking Created",
            data:Newbooking
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}