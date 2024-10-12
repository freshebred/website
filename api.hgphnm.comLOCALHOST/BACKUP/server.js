//import mongoose from 'mongoose';
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");


require('dotenv').config()

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open',()=>console.log('connected to database'))

app.use(express.json())

const limiterAuth = rateLimit({
    max: 50,
    windowMs: 10*60*1000,
    message: "Too many request!"
})
const limiterDB = rateLimit({
    max: 50,
    windowMs: 10*60*1000,
    message: "Too many request!"
})
app.use('/auth',limiterAuth)
app.use('/db',limiterDB)

const userRouter = require('./api/db')
app.use('/db', userRouter)
const authRouter = require('./api/auth')
app.use('/auth', authRouter)
const onboard = require('./api/onboardpage')
app.use('/', onboard)


app.listen(3000, ()=>console.log('server started'))

