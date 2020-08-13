const mongoose = require('mongoose');

// A model  -> reference to our collection

            //model name, Schema(Defination of collection)
mongoose.model("User",{
    FirstName:{
        type:String,
        require:true
    },
    LastName:{
        type:String,
        require:true
    },
    Username:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    Age:{
        type:Number,
        require:true
    }

});




