const userModel = require('../model/user')
require('dotenv').config()


exports.createUser = async(req, res)=>{
    try {
        const {firstName, lastName, email, phoneNumber, password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const Newuser = new userModel({
            fullName: `${firstName} ${lastName}`,
            email,
            phoneNumber,
            password:hashedPassword
        })
        brevo(Newuser.email,Newuser.fullName,emailTemplate(Newuser.fullName,Newuser.otp))
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

    