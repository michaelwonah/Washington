const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

let numberOfAttempts = 0

exports.createUser = async(req, res)=>{
    try {
        const {firstName, lastName, email, phoneNumber, password} = req.body

        const existingUser = await userModel.findOne({ email: email.toLowerCase() })
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists'
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const Newuser = new userModel({
            firstName,
            lastName,
            email: email.toLowerCase(),
            phoneNumber,
            password:hashedPassword
        })

        await Newuser.save()
        res.status(201).json({
            message:"users Created",
            data:Newuser
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
        const user = await userModel.findOne({ email: email.toLowerCase() })

        if (!user){
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
        //Extract the required fields from the request body
        const {otp, password, email} = req.body;
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
    
