const clientModel = require('../model/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

let numberOfAttempts = 0

exports.createClient = async(req, res)=>{
    try {
        const {firstName, lastName, email, phoneNumber, password, address} = req.body

        const existingClient = await clientModel.findOne({ email: email.toLowerCase() })
        if (existingClient) {
            return res.status(400).json({
                message: 'Client already exists'
            })  
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const NewClient = new clientModel({
            firstName,
            lastName,
            email: email.toLowerCase(),
            phoneNumber,
            password:hashedPassword,
            address
        })

        await NewClient.save()
        res.status(201).json({
            message:"clients Created",
            data:NewClient
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const client = await clientModel.findOne({ email: email.toLowerCase() })

        if (!client){
            numberOfAttempts++
            return res.status(404).json({
                message: 'Invalid Credentials'
            })                       
        }

        const correctPassword = await bcrypt.compare(password, user.password)

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
            {id: user._id, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn: '1d'}
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user
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
        const {otp, password, email} = req.body;
        const client = await clientModel.findOne({ email: email.toLowerCase() });

        if(client == null) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        if (Date.now() > client.otpExpire || otp !== client.otp ) {
            return res.status(400).json({
                message: 'Invalid OTP'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        client.password = hashedPassword
        //save the changes to the database
        await client.save();

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
    
