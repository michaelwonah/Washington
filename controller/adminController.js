const adminModel = require('../model/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

let numberOfAttempts = 0

exports.createAdmin = async(req, res)=>{
    try {
        const {firstName, lastName, email, phoneNumber, password} = req.body

        const existingAdmin = await adminModel.findOne({ email: email.toLowerCase() })
        if (existingAdmin) {
            return res.status(409).json({
                message: 'Admin already exists'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const Newadmin = new adminModel({
            firstName,
            lastName,
            email: email.toLowerCase(),
            phoneNumber,
            password:hashedPassword
        })

        await Newadmin.save()
        res.status(201).json({
            message:"admin Created",
            data:Newadmin
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


exports.signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const admin = await adminModel.findOne({ email: email.toLowerCase() })

        if (!admin){
            numberOfAttempts++
            return res.status(404).json({
                message: 'Invalid Credentials'
            })                       
        }

        const correctPassword = await bcrypt.compare(password, admin.password)

        if (!correctPassword) {
            numberOfAttempts++
            if(numberOfAttempts > 5){
                return res.status(429).json({
                    message: 'Account locked'
                })
            }
            return res.status(400).json({
                message: 'Invalid Credentials'
            })
        }
        numberOfAttempts = 0

        const token = jwt.sign(
            {id: admin._id, role: admin.role},
            process.env.SECRET_KEY,
            {expiresIn: '1d'}
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            admin
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: `Something went wrong`
        })
    }
}


exports.resetpassword = async (req, res) => {
    try {
        //Extract the required fields from the request body
        const {otp, password, email} = req.body;
        //Find the user
        const admin = await adminModel.findOne({ email: email.toLowerCase() });

        //check if the admin exists
        if(admin == null) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        if (Date.now() > admin.otpExpire || otp !== admin.otp ) {
            return res.status(400).json({
                message: 'Invalid OTP'
            })
        }

        //Reset the admin password with the encrypted and updated password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        admin.password = hashedPassword
        //save the changes to the database
        await admin.save();

        //send a success response
        res.status(200).json({
            message: 'Password reset successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
    
