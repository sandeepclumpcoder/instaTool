const mongoose = require('mongoose');

const mongoURI =  "mongodb://127.0.0.1:27017/instaTool"

module.exports.connectToMongo = () => {
    mongoose
        .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Database connected!"))
        .catch(err => console.log(err));
}

