const express = require('express');
const router = express.Router();

const bookingController = require('./bookingController');

//create new Booking
router.post('/booking', bookingController.PostNewBooking);


//To Get all bookings
router.get('/bookings',bookingController.getAllBookings);


router.get("/booking/:id",bookingController.getSingleBooking);


module.exports = router;

