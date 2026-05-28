const router = require('express').Router()
const { createAdmin, signIn,  resetpassword } = require('../controller/adminController')
const { signUpValidator, loginValidator, resetPasswordValidator, newPasswordValidator } = require('../middleware/validator')

 
router.post('/', signUpValidator, createAdmin);
router.post('/signIn', loginValidator, signIn)
router.post('/reset-password', resetPasswordValidator, resetpassword)


module.exports = router 
 
