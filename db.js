const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/instaTool"


// const connectToMongo= ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("mongo connection successfully created");
//     })
// }

// module.exports = connectToMongo;

module.exports.connectToMongo =  () => {
    return new Promise(async(resolve, reject) => {
        mongoose
            .connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, result) => {
                if (err) {
                    let response = {
                        err: err
                    }
                    console.log("error");
                    reject(response);
                } else {
                    console.log("DB connected");
                    resolve("connected success");
                }
            })
    })
}


// module.exports.connectToMongo = async () => {
//     mongoose
//         .connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//         .then(() => console.log("Database connected!"))
//         .catch((err) => console.log(err));
// }

