const express = require('express');

//instance of express application
const app = express();

const bookingRoutes = require('./bookingRoutes');

const bodyParser = require('body-parser');  //to save data from request

app.use(bodyParser.json());

//load mongoose
const mongoose = require('mongoose');

require('./BookingModel');
const Booking = mongoose.model("Booking");

//connect to database
mongoose.connect('mongodb+srv://samarth:YEhVsBnsh2nXlMa5@cluster0.ahjqa.mongodb.net/CalenderService?retryWrites=true&w=majority', { useUnifiedTopology: true })
                                            .then(res=>{
                                                console.log("Database Connected - Calender Service");
                                            })
                                            .catch(err=>console.log(err));

app.use(bookingRoutes);


app.listen(3001,()=>{
    console.log("Up and running! -- This is our Calender service");
});


