require("dotenv").config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userAuth = require('./router/userRoutes');
const dbConnection  = require('./db');
const fileupload = require("express-fileupload");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

dbConnection.connectToMongo();

app.use(express.json());
app.use(fileupload());
app.use('/' , userAuth);

app.listen(3000 , ()=>{
    console.log('server started at port' , 3000);
});
