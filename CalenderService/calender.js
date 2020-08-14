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


//MVC approach in each service
             
//Command Service --
//localhost:4000/...

//all possible functionality will be called from this ports onwards


//TEST CASES--

// Test Case Name                                      Test Case Steps
// Validate that user is able to book a slot           1. Open postman
//                                                     2. Enter url: ".ldflkjd"
//                                                     3. Enter request body data: "...."
//                                                     4. Press Send button.
//                                                     5. Verify that user is able to view the response in the required format.

//                                                     Required Format:
//                                                     "....."

// Validate that user is able to register              1. Open postman
//                                                     2. Enter url: ".ldflkjd"
//                                                     3. Enter request body data: "...."
//                                                     4. Press Send button.

//                                                     basically same chize
//                                                     okay bahi
//                                                     THANK YOU bht jyada... :))))anytime
//                                                     bro
//                                                     So skta h ab true...thike by by gn sd tc <
//                                                     3ok bye<3