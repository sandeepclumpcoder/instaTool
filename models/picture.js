const mongoose = require('mongoose')
const { Schema } = mongoose;

const PictureSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    picture:{ 
        type: String,
    },
    Date:{
        type: Date,
        default:Date.now
    },
});


module.exports = mongoose.model('picture', PictureSchema)