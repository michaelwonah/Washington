const router = require('express').Router()
const { createOrder, assignedOrder, readyOrder, deliveredOrder, cancelledOrder, allOrders, oneOrder } = require('../controller/order')
const { checkLogin}  = require('../middleware/auth')
const { createOrderValidator, assignedDriverValidator } = require('../middleware/validator')

router.post('/', createOrderValidator, createOrder)
router.post('/:bookingId', checkLogin, assignedDriverValidator, assignedOrder)
router.put('/ready/:orderId', checkLogin, readyOrder)
router.put('/delivered/order/:orderId', checkLogin, deliveredOrder)
router.put('/cancelled/:bookingId', checkLogin, cancelledOrder)
router.get('/allOrder', checkLogin, allOrders)
router.get('/oneOrder', checkLogin, oneOrder)

module.exports = router
