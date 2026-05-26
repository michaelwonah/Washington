const router = require('express').Router()
const { changePassword } = require('../controller/password')
const { checkLogin } = require('../middleware/auth')

router.patch('/change', checkLogin, changePassword)

module.exports = router
