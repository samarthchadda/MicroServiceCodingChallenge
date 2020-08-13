const express = require('express');

//instance of express application
const app = express();

const bodyParser = require('body-parser');  //to save data from request

app.use(bodyParser.json());

//load mongoose
const mongoose = require('mongoose');

const axios = require('axios');

require('./BookingModel');
const Booking = mongoose.model("Booking");

//connect to database
mongoose.connect('mongodb+srv://samarth:YEhVsBnsh2nXlMa5@cluster0.ahjqa.mongodb.net/CalenderService?retryWrites=true&w=majority', { useUnifiedTopology: true })
                                            .then(res=>{
                                                console.log("Database Connected - Calender Service");
                                            })
                                            .catch(err=>console.log(err));


//create new Booking
app.post('/booking', (req,res,next)=>{

    var newBooking = {
        UserID:req.body.UserID,
        BookingInfo:req.body.BookingInfo   
    }

    var booking = new Booking(newBooking);
    console.log(booking);

    var dt = new Date(booking.BookingInfo);
    console.log(dt.getHours());
    console.log(dt.getMinutes());
    console.log(dt.getSeconds());
      


    booking.save().then(()=>{
        res.send("Booking DONE");
    })
    .catch(err=>console.log(err));
})


//To Get all bookings
app.get('/bookings',(req,res,next)=>{

        //this will return all the booking in collection
    Booking.find().then((bookings)=>{
        
        res.json(bookings);
    })
    .catch(err=>console.log(err));

})


app.get("/booking/:id",(req,res,next)=>{

    Booking.findById(req.params.id).then((bookingData)=>{

    if(bookingData)            //BookingData is present, so we return its dataa
    {
    //if Booking is valid , we need to send requests to other services
    //For this , we need a library called 'axios'(allows to make http requests to any address)

    //get request to customers service
    axios.get("http://localhost:3000/user/"+bookingData.UserID)
                        .then((result)=>{
                            console.log("User Data : ",result.data);

                            var bookingObject = {Username : result.data.Username,BookingInfo:bookingData.BookingInfo};
                            res.json(bookingObject);
                          
                        });

    }else{
        res.sendStatus(404);
    }
    })
    .catch(err=>console.log(err));

})


app.listen(3001,()=>{
    console.log("Up and running! -- This is our Calender service");
});

             

