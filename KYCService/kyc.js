const express = require('express');

//instance of express application
const app = express();

const bodyParser = require('body-parser');  //to save data from request

app.use(bodyParser.json());

//load mongoose
const mongoose = require('mongoose');

const axios = require('axios');

require('./KYCModel');
const KYCReg = mongoose.model("KYCReg");

//connect to database
mongoose.connect('mongodb+srv://samarth:YEhVsBnsh2nXlMa5@cluster0.ahjqa.mongodb.net/KYCService?retryWrites=true&w=majority', { useUnifiedTopology: true })
                                            .then(res=>{
                                                console.log("Database Connected - KYC Service");
                                            })
                                            .catch(err=>console.log(err));



//KYC Registration functionality
app.post('/kyc',(req,res,next)=>{
    
    // console.log(req.body);   //printing JSON data send by post request

    //saving KYC in our database
    var newKYC = {
        UserID:req.body.UserID,
        dateOfRegistration:req.body.dateOfRegistration            
    };

    //model instance
        //creating a new KYC with data from POST request
    var kyc = new KYCReg(newKYC);

    console.log(kyc);


    
    kyc.save().then(()=>{
        console.log("New KYC Registered!");
    }).catch(err=>console.log(err));

    res.send("KYC Created with success");

});


app.listen(3002,()=>{
    console.log("Up and running! -- This is our KYC service");
});
                                            
                                                         