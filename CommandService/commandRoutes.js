const express = require('express');
const router = express.Router();

const cmdController = require('./commandControllers');
const { route } = require('../KYCService/kycRoutes');

//GET Requests
router.get('/',cmdController.initialCmd);

router.get('/users',cmdController.getAllUsers);

router.get('/user/:id',cmdController.getSingleUser);

router.get('/bookings',cmdController.getAllBookings);

router.get("/booking/:id",cmdController.getSingleBooking);

router.get('/kycs',cmdController.getAllKyc);


//POST Requests
router.post('/user',cmdController.PostNewUser);

router.post('/booking', cmdController.PostNewBooking);

router.post('/kyc', cmdController.PostUserKyc);



module.exports = router;