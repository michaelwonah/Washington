const router = require("express").Router()
const { bookLaundry } = require("../controller/bookingForm");

router.post('/', bookLaundry);

module.exports = router