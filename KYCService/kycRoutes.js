const express = require('express');
const router = express.Router();

const kycController = require('./kycControllers');


//KYC Registration functionality
router.post('/kyc',kycController.PostUserKyc);


//To Get all KYCs
router.get('/kycs',kycController.GetAllKyc);

//Verify if User has KYC registration
router.get("/kyc/:id",kycController.VerifyUserKyc);


module.exports = router;
