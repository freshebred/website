/*const { model, Schema} = require("/home/container/node_modules/mongoose");

let reportschema = new Schema({
    Guild: String,
    Channel: String
})

module.exports = model("reportschema", reportschema);*/
const mongoose = require('mongoose')

const reportschema = new mongoose.Schema({
    Guild:{
        type: String
    },
    Channel : {
        type: String,
    }
})


module.exports = model("reportschema", reportschema);