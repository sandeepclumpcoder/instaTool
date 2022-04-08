const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/instaTool"

// const connectToMongo = async () => {
//     mongoose.connect(mongoURI, () => {

//     }).then(() => console.log("Database connected!"))
//     .catch((err) => console.log(err));
// }

// module.exports = connectToMongo;

// module.exports.connectToMongo =async  () => {
//     return new Promise((resolve, reject) => {
//         mongoose
//             .connect(mongoURI, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             },(err,result)=>{
//                 if(err){
//                     let response={
//                         err:err
//                     }
//                     console.log("error");
//                     reject(response);
//                 }else{
//                     console.log("success");
//                     resolve("connected success");
//                 }
//             })
//     })
// }


// module.exports.connectToMongo = async () => {

//         .then(() => console.log("Database connected!"))
//         .catch((err) => console.log(err));
// }

module.exports.connectToMongo = async () => {
    mongoose
        .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Database connected!"))
        .catch((err) => console.log(err));
}

