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
console.log(newBooking);

    axios.get('http://localhost:3002/kyc/'+req.body.UserID)
                .then((result)=>{
                    console.log("Inside Booking :",result.data.KYCStatus);
                    if(result.data.KYCStatus){
                        //all below code

                        var booking = new Booking(newBooking);
                        console.log(booking);
                        

                        // var dt1 = new Date(booking.BookingInfo);
                        // console.log("Date 1 : ", dt1);
                        // var hrs1 = dt1.getHours().toString();
                        // var min1 = dt1.getMinutes().toString();
                        // var sec1 = dt1.getSeconds().toString();

                        //checking if booking already exist in a timeslot

                                Booking.find().then((bookings)=>{

                                let bookingBool = true;

                                bookings.forEach(b=>{
                                    // var dt2 = new Date(b.BookingInfo);
                                    // console.log("Date 2 :", dt2);
                                    // var hrs2 = dt2.getHours().toString();
                                    // var min2 = dt2.getMinutes().toString();
                                    // var sec2 = dt2.getSeconds().toString();
                                    console.log("Booking 2 :", b.BookingInfo);

                                    // (b.BookingInfo -  booking.BookingInfo) < 60m
                                    if(booking.BookingInfo.toString() === b.BookingInfo.toString())
                                    {
                                        console.log("TimeSlot is already occupied");
                                        bookingBool = false;              
                                        
                                    //send a response                  
                                                                
                                    } else{
                                        console.log("Slot Available");
                            
                                        // return;     
                                    }    
                                })            

                                if(bookingBool){
                                    console.log("yes!!");
                                    booking.save().then(()=>{
                                        res.send("Booking DONE");
                                    })
                                    .catch(err=>console.log(err));
                                }else{
                                    res.send("Booking not DONE");
                                }

                            })
                            .catch(err=>console.log(err))    



                    }else{
                        res.json({"Status":false,"Message":"Sorry KYC not completed!"});
                    }
                })
    

         
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

    //get request to IdentityService
    axios.get("http://localhost:3000/user/"+bookingData.UserID)
                        .then((result)=>{
                            console.log("User Data : ",result.data);
                            var dt = new Date(bookingData.BookingInfo);
                            // var hrs = dt.getHours().toString();
                            // var min = dt.getMinutes().toString();
                            // var sec = dt.getSeconds().toString();
                                                        
                            // var timeOfBooking = hrs+":"+min+":"+sec;
                            var bookingObject = {Username : result.data.Username,TimeOfBooking:dt.toTimeString()};
                            res.json(bookingObject);
                          
                            //send response , and timeslot

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