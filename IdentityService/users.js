
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


app.get('/',(req, res, next)=>{
    res.send("This is the Identity service!");
})

//'Create User' functionality
app.post('/user',(req,res,next)=>{
    
    // console.log(req.body);   //printing JSON data send by post request

    //saving book in our database
    var newUser = {
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Username:req.body.Username,
        Password:req.body.Password,
        Address:req.body.Address,
        Age:req.body.Age,
            
    };

    //model instance
        //creating a new user with data from POST request
    var user = new User(newUser);

    console.log(user);

    user.save().then(()=>{
        console.log("New User Created!");
    }).catch(err=>console.log(err));

    res.send("User Created with success");

})

app.listen(3000,()=>{
    console.log("Up and running! -- This is our Identity service");
});

                                            
