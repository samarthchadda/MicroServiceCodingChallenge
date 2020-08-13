const mongoose = require("mongoose");

mongoose.model("Booking",{
    UserID:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    BookingInfo:{
        type:Date,
        require:true
    }
})
