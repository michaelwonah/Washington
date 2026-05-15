const router = require('express').Router()
const { createUser, verifyEmail } = require('../controller/userController')
const { signUpValidator, changePasswordValidator } = require('../middleware/validator')


router.post('/user', signUpValidator, createUser);
 