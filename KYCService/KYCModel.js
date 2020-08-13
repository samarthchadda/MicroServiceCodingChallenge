const mongoose = require("mongoose");

mongoose.model("KYCReg",{
    UserID:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    dateOfRegistration:{
        type:Date,
        require:true
    }
})
