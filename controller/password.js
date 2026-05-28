const bcrypt = require('bcrypt')
const adminModel = require('../model/Admin')
const passwordModel = require('../model/password')

exports.changePassword = async (req, res) => {
    try {
        const adminId = req.user.id
        const { currentPassword, newPassword, confirmNewPassword } = req.body

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password and confirm new password do not match'
            })
        }

        const admin = await adminModel.findById(adminId)

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            })
        }

        const correctPassword = await bcrypt.compare(currentPassword, admin.password)

        if (!correctPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            })
        }

        const salt = await bcrypt.genSalt(10)
        admin.password = await bcrypt.hash(newPassword, salt)
        admin.confirmPassword = admin.password
        await admin.save()

        await passwordModel.create({ adminId })

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
