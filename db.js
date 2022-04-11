const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/instaTool"


const connectToMongo= ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("mongo connection successfully created");
    })
}

module.exports = connectToMongo;




