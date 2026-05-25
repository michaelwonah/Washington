const bookingFormModel = require('../model/bookingForm')
require('dotenv').config()

exports.bookLaundry = async(req, res)=>{
    try {
        const {firstName, surname, email, phoneNumber, address, amount, pickupDate, pickupTime, serviceType, servicePackage, specialInstruction} = req.body
        const Newbooking = new bookingFormModel({
            firstName,
            surname,
            email: email.toLowerCase(),
            phoneNumber,
            address,
            amount,
            pickupDate,
            pickupTime,
            serviceType,
            servicePackage,
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

exports.getbookings = async (req, res) => {
  try {
    const booking = await bookingFormModel.find()
    res.status(200).json({
      message: 'All customers',
      data: booking,
      count: booking.length
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

// const existingbooking = await bookingFormModel.find({ email: email.toLowerCase() })
//         if (existingbooking) {
//             return res.status(400).json({
//                 message: 'The booking already exists'
//             })  
//         }