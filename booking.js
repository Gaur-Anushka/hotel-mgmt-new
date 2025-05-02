const express = require('express')
const router = express.Router();
const {createBooking,getMyBookings,getAllBookings,getAllBookingInfos} = require('../Controllers/booking');
const authMiddleware = require('../Middleware/auth')
router.post('/',authMiddleware,createBooking);
router.get('/my-bookings',authMiddleware,getMyBookings);
router.get('/all', authMiddleware, getAllBookings);
router.get('/view-booking', getAllBookingInfos);
module.exports = router;