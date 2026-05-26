const businessNameModel = require('../model/businessName')

exports.createBusinessName = async (req, res) => {
    try {
        const adminId = req.user.id
        const { businessName, email, phoneNumber, address } = req.body

        const existingBusinessName = await businessNameModel.findOne({ adminId })

        if (existingBusinessName) {
            return res.status(409).json({
                success: false,
                message: 'Business name already exists'
            })
        }

        const newBusinessName = await businessNameModel.create({
            adminId,
            businessName,
            email,
            phoneNumber,
            address
        })

        res.status(201).json({
            success: true,
            message: 'Business name created successfully',
            data: newBusinessName
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateBusinessName = async (req, res) => {
    try {
        const adminId = req.user.id
        const { businessName, email, phoneNumber, address } = req.body

        const updatedBusinessName = await businessNameModel.findOneAndUpdate(
            { adminId },
            { businessName, email, phoneNumber, address },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedBusinessName) {
            return res.status(404).json({
                success: false,
                message: 'Business name not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Business name updated successfully',
            data: updatedBusinessName
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
