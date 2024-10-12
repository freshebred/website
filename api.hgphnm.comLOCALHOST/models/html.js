const mongoose = require('mongoose')

const htmlSchema = new mongoose.Schema({
    html:{
        type: String,
        required: true
    },
    bindtoken:{
        type: String,
        required:true
    }
})



module.exports = mongoose.model('html', htmlSchema)