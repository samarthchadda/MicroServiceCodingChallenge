//load mongoose
const mongoose = require('mongoose');

const axios = require('axios');

require('./BookingModel');
const Booking = mongoose.model("Booking");

exports.PostNewBooking = (req,res,next)=>{

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
                        
                        //checking if booking already exist in a timeslot

                                Booking.find().then((bookings)=>{

                                let bookingBool = true;

                                bookings.forEach(b=>{
                                
                                    console.log("Booking 2 :", b.BookingInfo);
                                    var dt1 = new Date(booking.BookingInfo);
                                    console.log(dt1.getTime());
                                    
                                    var dt2 = new Date(b.BookingInfo);
                                    console.log(dt2.getTime());
                                    // console.log((dt1-dt2));
                                    // var oneHrSlot = new Date(0,0,0,0,60,0,0);
                                    // console.log((dt1-dt2)>oneHrSlot);
                                    var diff = Math.abs(dt1-dt2);
                                    var minutesDiff = Math.floor((diff/1000)/60);
                                    console.log(minutesDiff);
                                    
                                    // (b.BookingInfo -  booking.BookingInfo) < 60m
                                    // if(booking.BookingInfo.toString() === b.BookingInfo.toString())
                                    // {
                                    if(minutesDiff<=60)
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
                                    res.send("Booking not DONE(SLOT NOT AVALIABLE)");
                                }

                            })
                            .catch(err=>console.log(err))    

                    }else{
                        res.json({"Status":false,"Message":"Sorry KYC not completed(Surname not starting with A)!"});
                    }
                })           
};


exports.getAllBookings = (req,res,next)=>{

            //this will return all the booking in collection
        Booking.find().then((bookings)=>{

            var bookingObj = [];

            bookings.forEach(b=>{
                bookingObj.push({BookingID: b._id,
                                UserID:b.UserID,
                                DateOfBooking:b.BookingInfo.toDateString(),
                                TimeOfBooking:b.BookingInfo.toTimeString(),})

            })
            
            res.json(bookingObj);
        })
        .catch(err=>console.log(err));

};

exports.getSingleBooking = (req,res,next)=>{

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
                      
                            var bookingObject = {Username : result.data.Username,
                                                FirstName:result.data.FirstName,
                                                LastName:result.data.LastName,                                                
                                                TimeOfBooking:dt.toTimeString()};
                            res.json(bookingObject);
                          
                            //send response , and timeslot

                        });

    }else{
        res.sendStatus(404);
    }
    })
    .catch(err=>console.log(err));

};


