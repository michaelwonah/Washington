const adminModel = require('../model/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const brevo = require('@getbrevo/brevo')
const { resetPasswordTemplate, resetPasswordSuccessfulTemplate } = require('../email')
require('dotenv').config()

let numberOfAttempts = 0

// const sendEmail = async ({ to, subject, htmlContent }) => {
//     const emailApi = new brevo.TransactionalEmailsApi()
//     emailApi.authentications.apiKey.apiKey = process.env.BREVO_API_KEY

//     const message = new brevo.SendSmtpEmail()
//     message.subject = subject
//     message.htmlContent = htmlContent
//     message.sender = {
//         name: process.env.SENDER_NAME || 'Washington Logistics',
//         email: process.env.SENDER_EMAIL || 'washingtonlogisticsinfo@gmail.com'
//     }
//     message.to = [to]

//     return emailApi.sendTransacEmail(message)
// }

// const createResetPasswordLink = (token) => {
//     const resetPasswordUrl = process.env.RESET_PASSWORD_URL || 'http://localhost:3000/reset-password'
//     return `${resetPasswordUrl}/${token}`
// }

exports.createAdmin = async(req, res)=>{
    try {
        const {firstName, lastName, email, password, confirmPassword} = req.body

        const existingAdmin = await adminModel.findOne({ email: email.toLowerCase() })
        if (existingAdmin) {
            return res.status(409).json({
                message: 'Admin already exists'
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Passwords do not match'
            })
        }   

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const Newadmin = new adminModel({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password:hashedPassword,
            confirmPassword: hashedPassword
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
        const { email} = req.body;
        //Find the user
        const user = await userModel.findOne({ email: email.toLowerCase() });

        //check if the user exists
        if(user == null) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        if (Date.now() > user.otpExpire || otp !== user.otp ) {
            return res.status(400).json({
                message: 'Invalid OTP'
            })
        }

        //Reset the user password with the encrypted and updated password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword
        //save the changes to the database
        await user.save();

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
    
