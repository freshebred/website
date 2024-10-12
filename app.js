
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const URI = 'mongodb+srv://read:1@cluster0.ezkaamq.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(URI)
.then ((res)=>console.log('connected to database'))
.catch ((err)=>console.warn(err));

