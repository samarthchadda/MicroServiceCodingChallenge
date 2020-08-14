const express = require('express');

//instance of express application
const app = express();

const kycRoutes = require('./kycRoutes');

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


app.use(kycRoutes);


app.listen(3002,()=>{
    console.log("Up and running! -- This is our KYC service");
});
                                            
                                                         