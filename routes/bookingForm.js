const router = require("express").Router()
const { bookLaundry, getbookings } = require("../controller/bookingForm");
const { bookLaundryValidator } = require("../middleware/validator");

router.post('/', bookLaundryValidator, bookLaundry);
router.get('/', getbookings)

module.exports = router