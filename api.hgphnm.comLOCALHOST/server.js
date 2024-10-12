//import mongoose from 'mongoose';
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());
app.set('trust proxy', 1); 


const limiterAuth = rateLimit({
  max: 50,
  windowMs: 10 * 60 * 1000,
  message: "Too many request!",
});
const limiterDB = rateLimit({
  max: 50,
  windowMs: 10 * 60 * 1000,
  message: "Too many request!",
});
const limiterDiscord = rateLimit({
  max: 25,
  windowMs: 10 * 60 * 1000,
  message: "Too many request!",
});
const limiterTranscript = rateLimit({
  max: 3,
  windowMs: 1000*60*5,
  message: "Too many request!",
});
const discordrandom = rateLimit({
  max: 3,
  windowMs: 1000*3,
  message: "Too many request!",
});
app.use("/auth", limiterAuth);
app.use("/db", limiterDB);
app.use("/discord", limiterDiscord);
app.use("/discord/random", discordrandom);

/*const userRouter = require('./api/db')
app.use('/db', userRouter)
const authRouter = require('./api/auth')
app.use('/auth', authRouter)*/
const onboard = require("./api/onboardpage");
app.use("/", onboard);
// Requiring module 
app.use((req, res, next) => { 
    res.status(404).json( 
        {message:"resource not found lol"}) 
}) 


// Server setup 
//app.use('/', limiterDB)

app.listen(3000, () => console.log("server started"));
