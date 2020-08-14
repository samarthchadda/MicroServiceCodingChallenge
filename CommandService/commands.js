const express = require('express');

//instance of express application
const app = express();

const cmdRoutes = require('./commandRoutes');

const bodyParser = require('body-parser');  //to save data from request

app.use(bodyParser.json());

app.use(cmdRoutes);



app.listen(4000,()=>{
    console.log("Up and running! -- This is our COMMAND service");
});


