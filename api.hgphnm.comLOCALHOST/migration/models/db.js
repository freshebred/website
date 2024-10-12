const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email : {
        type: String,
        required: false
    },
    product :{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        required: true,
        default: new Date()
    }
})



module.exports = mongoose.model('users', userSchema)