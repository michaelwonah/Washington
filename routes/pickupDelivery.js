const router = require('express').Router()
const {
    createPickupDelivery,
    allPickupDeliveries,
    onePickupDelivery,
    updatePickupDeliveryStatus,
    deletePickupDelivery
} = require('../controller/pickupDelivery')
const { checkLogin } = require('../middleware/auth')
const { pickupDeliveryValidator, pickupDeliveryStatusValidator } = require('../middleware/validator')

router.post('/', checkLogin, pickupDeliveryValidator, createPickupDelivery)
router.get('/', checkLogin, allPickupDeliveries)
router.get('/:pickupDeliveryId', checkLogin, onePickupDelivery)
router.put('/status/:pickupDeliveryId', checkLogin, pickupDeliveryStatusValidator, updatePickupDeliveryStatus)
router.delete('/:pickupDeliveryId', checkLogin, deletePickupDelivery)

module.exports = router
