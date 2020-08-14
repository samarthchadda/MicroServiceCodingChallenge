const mongoose = require('mongoose');

const axios = require('axios');

exports.initialCmd = (req,res,next)=>{
    res.send("<div style='text-align:center'><br><h1>Welcome TO Calender Booking Functionality</h1><h2>This is our Command Service</h2></div>")
};

exports.getAllUsers = (req,res,next)=>{

    axios.get('http://localhost:3000/users')
            .then(result=>{
                console.log(result.data);

                res.json(result.data);
            })

};

exports.getSingleUser = (req,res,next)=>{

    axios.get('http://localhost:3000/user/'+req.params.id)
            .then(result=>{
                console.log(result.data);

                res.json(result.data);
            })

};

exports.getAllBookings = (req,res,next)=>{

    axios.get('http://localhost:3001/bookings')
            .then(result=>{
                console.log(result.data);

                res.json(result.data);
            })

};

exports.getSingleBooking = (req,res,next)=>{

    axios.get('http://localhost:3001/booking/'+req.params.id)
            .then(result=>{
                console.log(result.data);

                res.json(result.data);
            })

};

exports.getAllKyc = (req,res,next)=>{

    axios.get('http://localhost:3002/kycs')
            .then(result=>{
                console.log(result.data);

                res.json(result.data);
            })

};


exports.PostNewUser = (req,res,next)=>{

    axios.post('http://localhost:3000/user',req.body)
            .then(result=>{
                console.log(result.data);

                res.json(result.data);
            })

};

exports.PostNewBooking = (req,res,next)=>{

    axios.post('http://localhost:3001/booking',req.body)
            .then(result=>{
                console.log(result.data);

                res.json(result.data);
            })

};

exports.PostUserKyc = (req,res,next)=>{

    axios.post('http://localhost:3002/kyc',req.body)
            .then(result=>{
                console.log(result.data);

                res.json(result.data);
            })

};



