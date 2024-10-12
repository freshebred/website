const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    },
    dscid:{
        type: Number,
        required: true
    }
})



module.exports = mongoose.model('token', tokenSchema)