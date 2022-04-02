const mongoose = require('mongoose')
const { Schema } = mongoose;

const otpSchema = new Schema({
    email:{
        type: String,
    },
    code:{
        type: String,
    },
    expireIn:{
        type: Number,
    },
});
const otp = mongoose.model('otp', otpSchema, 'otp')
module.exports = otp;