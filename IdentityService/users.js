
const express = require('express');

//instance of express application
const app = express();

const bodyParser = require('body-parser');  //to save data from request

app.use(bodyParser.json());


//load mongoose
const mongoose = require('mongoose');

require('./UserModel');
const User = mongoose.model("User");

//connect to database
mongoose.connect('mongodb+srv://samarth:YEhVsBnsh2nXlMa5@cluster0.ahjqa.mongodb.net/IdentityService?retryWrites=true&w=majority', { useUnifiedTopology: true })
                                            .then(res=>{
                                                console.log("connected to Database!!");
                                            })
                                            .catch(err=>console.log(err));


app.listen(3000,()=>{
    console.log("Up and running! -- This is our Identity service");
});

                                            
