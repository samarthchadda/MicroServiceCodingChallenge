const express = require('express');
const router = express.Router();

const userController = require('./usersController');


router.get('/',userController.getInitial);


//'Create User' functionality
router.post('/user',userController.PostAddUser);


//To Get all Users
router.get('/users',userController.getAllUsers);


//To get Particular user 
router.get('/user/:id',userController.getSingleUser);


//Delete a User
router.delete("/user/:id",userController.deleteSingleUser);


module.exports = router;

