const router = require('express').Router()
const { createUser, login, resetpassword } = require('../controller/userController')
const { signUpValidator, loginValidator, resetPasswordValidator } = require('../middleware/validator')

 
router.post('/', signUpValidator, createUser);
router.post('/login', loginValidator, login)
router.post('/reset-password', resetPasswordValidator, resetpassword)

module.exports = router 
 
