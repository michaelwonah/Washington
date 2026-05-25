const router = require('express').Router()
const { allCustomer, allActiveCustomer, allInactiveCustomer } = require('../controller/customer')
const { checkLogin } = require('../middleware/auth')

router.get('/', checkLogin, allCustomer)
router.get('/activeCustomer', checkLogin, allActiveCustomer)
router.get('/inactiveCustomer', checkLogin, allInactiveCustomer)
module.exports = router
