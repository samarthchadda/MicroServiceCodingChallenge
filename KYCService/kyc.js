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

    //Registering USer (ONLY IF the LastName starts with "A")
    axios.get("http://localhost:3000/user/"+newKYC.UserID)
            .then(user=>{
                console.log("USER : ", user.data);

                if(user.data.LastName.startsWith('A')){
                    console.log("Name starts with A");
                    kyc.save().then(()=>{
                        console.log("New KYC Registered!");
                    }).catch(err=>console.log(err));
                
                    res.send("KYC Created with success");
                }
                else{
                    console.log("Different Name");
                    res.send("KYC Registration Failed!");                    

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

    KYCReg.findById(req.params.id).then((KYCData)=>{

    if(KYCData)            //KYCData is present, so we return its dataa
    {
    
    //get request to IdentityService
    axios.get("http://localhost:3000/user/"+KYCData.UserID)
                        .then((result)=>{
                            console.log("User Data : ",result.data);
                            var dt = new Date(KYCData.dateOfRegistration );
                            console.log(dt.toLocaleDateString());

                            var KYCObject = {KYCid : KYCData._id,
                                            UserID:result.data._id,
                                            UserFirstName:result.data.FirstName,
                                            UserLastName:result.data.LastName,
                                            DateOfRegistration: dt.toLocaleDateString()                                           

                                        };

                            res.json(KYCObject);
                        
                        });

    }else{
        res.sendStatus(404);
    }
    })
    .catch(err=>console.log(err));

})


app.listen(3002,()=>{
    console.log("Up and running! -- This is our KYC service");
});
                                            
                                                         