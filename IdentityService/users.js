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

    //saving user in our database
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


//To Get all Users
app.get('/users',(req,res,next)=>{

        //this will return all the users in collection
    User.find().then((users)=>{
        // console.log(users);
        res.json(users);
    })
    .catch(err=>console.log(err));

})


//To get Particular user 
app.get('/user/:id',(req,res,next)=>{

    User.findById(req.params.id).then((user)=>{

        if(user)            //user is present, so we return its dataa
        {
            res.json(user);
        }else{
            res.sendStatus(404);
        }
    })
    .catch(err=>console.log(err));

})

//Delete a User
app.delete("/user/:id",(req,res,next)=>{

    User.findByIdAndRemove(req.params.id).then(()=>{
        res.send("User removed with success!")
    })
    .catch(err=>console.log(err));

})


app.listen(3000,()=>{
    console.log("Up and running! -- This is our Identity service");
});

                                            
