const router = require('express').Router()
const { createBusinessName, updateBusinessName } = require('../controller/businessName')
const { checkLogin } = require('../middleware/auth')

router.post('/', checkLogin, createBusinessName)

router.patch('/', checkLogin, updateBusinessName)

module.exports = router
