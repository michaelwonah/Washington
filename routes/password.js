const router = require('express').Router()
const { changePassword } = require('../controller/password')
const { checkLogin } = require('../middleware/auth')
const { passwordChangeValidator } = require('../middleware/validator')

router.patch('/change', checkLogin, passwordChangeValidator, changePassword)

module.exports = router
