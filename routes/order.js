const router = require('express').Router()
const { createOrder, assignedOrder } = require('../controller/order')

router.post('/', createOrder)
router.put('/', assignedOrder)

module.exports = router