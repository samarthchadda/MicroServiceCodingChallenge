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

    //if user is already registered
    KYCReg.find({UserID:req.body.UserID})
            .then((user)=>{
                console.log("User : ", user);
                if(user[0])
                {
                    res.json({"KYCStatus":true,"Message":"USer is already registered"}); 
                }
                else{

                    
                    //Registering USer (ONLY IF the LastName starts with "A")
                    axios.get("http://localhost:3000/user/"+newKYC.UserID)
                    .then(user=>{
                        console.log("USER : ", user.data);
                        

                        if(user.data.LastName.startsWith('A')){
                            console.log("Name starts with A");
                            kyc.save().then(()=>{
                                console.log("New KYC Registered!");
                            }).catch(err=>console.log(err));
                        
                            // res.send("KYC Done!");
                            res.json({"KYCStatus":true,"Message":"User Registration Complete!"});
                        }
                        else{
                            console.log("Different Name");
                            // res.send("KYC Registration Failed!");      
                            res.json({"KYCStatus":false,"Message":"Name not starting with 'A'!"});              

                        }

                    }) 

                }
            })


  
});


//To Get all KYCs
app.get('/kycs',(req,res,next)=>{

        //this will return all the KYCs in collection
    KYCReg.find().then((kycs)=>{
        
        res.json(kycs);
    })
    .catch(err=>console.log(err));

})


app.get("/kyc/:id",(req,res,next)=>{

    //get request to IdentityService
    axios.get("http://localhost:3000/user/"+req.params.id)
            .then((result)=>{

                    console.log("User Data : ",result.data);
                    
                    var KYCObject = {};
                    // console.log(result.data.LastName.startsWith('A'));
                    if(result.data.LastName.startsWith('A')){
                        KYCObject = { KYCStatus: true, message: "KYC is completed" }
                    }else{
                        KYCObject = { KYCStatus: false, message: "KYC is not completed" }
                    }
                    res.json(KYCObject);
                    
            });

})


app.listen(3002,()=>{
    console.log("Up and running! -- This is our KYC service");
});
                                            
                                                         