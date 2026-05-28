const adminModel = require('../model/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const brevo = require('@getbrevo/brevo')
const { resetPasswordTemplate, resetPasswordSuccessfulTemplate } = require('../email')
require('dotenv').config()

let numberOfAttempts = 0

const sendEmail = async ({ to, subject, htmlContent }) => {
    const emailApi = new brevo.TransactionalEmailsApi()
    emailApi.authentications.apiKey.apiKey = process.env.BREVO_API_KEY

    const message = new brevo.SendSmtpEmail()
    message.subject = subject
    message.htmlContent = htmlContent
    message.sender = {
        name: process.env.SENDER_NAME || 'Washington Logistics',
        email: process.env.SENDER_EMAIL || 'washingtonlogisticsinfo@gmail.com'
    }
    message.to = [to]

    return emailApi.sendTransacEmail(message)
}

const createResetPasswordLink = (token) => {
    const resetPasswordUrl = process.env.RESET_PASSWORD_URL || 'http://localhost:3000/reset-password'
    return `${resetPasswordUrl}/${token}`
}

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


exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await adminModel.findOne({ email: email.toLowerCase() });

        if(admin == null) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const hashedResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')

        admin.resetPasswordToken = hashedResetToken
        admin.resetPasswordExpire = Date.now() + (1000 * 60 * 15)
        await admin.save()

        const resetLink = createResetPasswordLink(resetToken)

        await sendEmail({
            to: { email: admin.email, name: `${admin.firstName} ${admin.lastName}` },
            subject: 'Reset your Washington Logistics password',
            htmlContent: resetPasswordTemplate({
                name: admin.firstName,
                resetLink
            })
        })

        res.status(200).json({
            message: 'Password reset link sent to email'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.resetpassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body
        const hashedResetToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')

        const admin = await adminModel.findOne({
            resetPasswordToken: hashedResetToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if(admin == null) {
            return res.status(400).json({
                message: 'Invalid or expired reset link'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        admin.password = hashedPassword
        admin.resetPasswordToken = undefined
        admin.resetPasswordExpire = undefined

        await admin.save();

        await sendEmail({
            to: { email: admin.email, name: `${admin.firstName} ${admin.lastName}` },
            subject: 'Your Washington Logistics password was reset',
            htmlContent: resetPasswordSuccessfulTemplate(admin.firstName)
        })

        res.status(200).json({
            message: 'Password reset successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
    
