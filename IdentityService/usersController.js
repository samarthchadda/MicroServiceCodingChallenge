const mongoose = require('mongoose');

require('./UserModel');
const User = mongoose.model("User");


exports.getInitial = (req, res, next)=>{
    res.send("This is the Identity service!");
};


exports.PostAddUser = (req,res,next)=>{
    
        // console.log(req.body);   //printing JSON data send by post request

        //saving user in our database
        var newUser = {
            FirstName:req.body.FirstName,
            LastName:req.body.LastName,
            Username:req.body.Username,
            Password:req.body.Password,
            Address:req.body.Address,
            Age:req.body.Age            
        };

        //model instance
            //creating a new user with data from POST request
        var user = new User(newUser);

        console.log(user);

        user.save().then(()=>{
            console.log("New User Created!");
        }).catch(err=>console.log(err));

        res.send("User Created with success");

};


exports.getAllUsers = (req,res,next)=>{

            //this will return all the users in collection
        User.find().then((users)=>{
            // console.log(users);
            res.json(users);
        })
        .catch(err=>console.log(err));

}


exports.getSingleUser = (req,res,next)=>{

        User.findById(req.params.id).then((user)=>{

            if(user)            //user is present, so we return its dataa
            {
                res.json(user);
            }else{
                res.sendStatus(404);
            }
        })
        .catch(err=>console.log(err));

}

exports.deleteSingleUser = (req,res,next)=>{

        User.findByIdAndRemove(req.params.id).then((result)=>{
            if(result){
            res.send("User Removed Successfully!!");
            }
            else{
                res.send("User Not FOUND!!");
            }
        })
        .catch(err=>console.log(err));

}


