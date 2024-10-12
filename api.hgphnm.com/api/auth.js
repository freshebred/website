const express = require('express');
const router = express.Router()
const token = require('../models/auth')
const axios = require("axios")
const url = require("url")

//get all

router.get('/get/:id', async (req, res) =>{
    if (req.params.id) {
        if (req.params.id == process.env.DB_PSW) {
            try {
                const tokens = await token.find()
                res.json(tokens)
            }   catch(err){
                res.status(500).json({message: err.message})
            }
        }
        else{
            res.status(401).json({message:"unauthorized"})
        }
    }
    else{
        res.status(400).json({message:"authorization missing"})
    }
})

//validate
router.get('/validate/:id',async (req, res)=>{
    //res.send(res.tkn)e
    const timenow = Math.floor(Date.now() / 1000);
     
//console.log(currentUnixTime);
    
    let tokens;
    try {
        tokens = await token.find({token: req.params.id})
        
        //const totalTime = timenow - tokens[0].timestamp

        if (!tokens[0]) {
        
            return res.status(404).json({exist: false, timeout: false})
        }
        else {
            console.log("time then is "+ tokens[0].timestamp + " and time now is " + timenow + "total time is " + timenow - tokens[0].timestamp)
            if(timenow - tokens[0].timestamp <= 15){
                //
                fetch('https://v1.hgphnm.com/auth/'+req.params.id, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                  .then(response => {
                    if (response.ok) {
                      console.log('Authentication entry deleted successfully.');
                    } else {
                      console.error(`Failed to delete authentication entry. Status: ${response.status}`);
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                  })
                  .then(data => {})
                  .catch(error => {
                    console.error('An error occurred:', error);
                  });                
                //
                res.status(201).json({exist: true, timeout: false})
                //console.log("time is:"+timenow - tokens.timestamp)
            }
            else{
                res.status(201).json({exist: true, timeout: true})
                //console.log("time is:"+timenow - tokens.timestamp)
            }
        }
    } catch(err){
        res.status(404).json({message:"not found, advanced code:"+err})
    }
    //let timethen = res.tkn.timestamp
    
})
//discord return
router.get('/return', async (req, res)=>{
    const {code} = req.query
    try {
        if (code) {
            const formData = new url.URLSearchParams({
                client_id: process.env.ClientId,
                client_secret: process.env.ClientSecret,
                grant_type: "authorization_code",
                code: code.toString(),
                redirect_uri: "https://v1.hgphnm.com/auth/return"
            })
            const output = await axios.post('https://discord.com/api/v10/oauth2/token',
                formData, {
                    headers: {
                        "Content-Type":"application/x-www-form-urlencoded"
                    },
                }
            )
            if (output.data){
                const access = output.data.access_token;
    
                const userinfo= await axios.get('https://discord.com/api/v10/users/@me', {
                    headers:{
                        "Authorization":`Bearer ${access}`
                    }
                })
                res.status(200).json(output.data, userinfo.data)

            }
        }
        else {
            res.status(400).json({message:"authorization required"})
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
    
});

//
function generateAlphanumeric(length = 64) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
  
  // Example usage:
  
  
//create one

router.post('/',async (req, res)=>{
    let timeherea
    let myRandomString = generateAlphanumeric();
    console.log(myRandomString); 
    fetch("http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh")
  .then(response => response.json())
  .then(async data => {
     timeherea = data.unixtime; // Extract the unixtime value
    console.log("Unix time:", timeherea);
    const tokens = new token({
        token: myRandomString,
        timestamp: timeherea
    })
    try {
        const newtoken = await tokens.save()
        res.status(201).json(newtoken)
    } catch(err) {
        res.status(400).json({message:err.message})
    }
  })
  .catch(error => console.error("Error:", error)); 
    
    
    //const currentUnixTime = Math.floor(Date.now() / 1000);
    //console.log("time right now is "+currentUnixTime)
    
    
})

//patch one
/*
router.patch('/:id',getUser,async (req, res)=>{
    if(req.body.name != null) {
        res.usr.name = req.body.name
    }
    if(req.body.email != null) {
        res.usr.email = req.body.email
    }
    if(req.body.product != null) {
        res.usr.product = req.body.product
    }
    try {
        const updateinfo = await res.usr.save()
        res.json({message:"updated info",updateinfo})
    } catch(err) {
        res.status(400).json({message:err.message})
    }
})
//delete one
*/

router.delete('/:id',getToken,async (req, res)=>{
    try {
        
        await res.tkn.deleteOne()
        res.json({message:'removed'})
    }
    catch (err) {
        res.status(500).json({message:err.message})
    }
})

//

async function getToken(req, res, next) {
    let tkn
    try {
        tkn = await token.find({token:req.params.id})
        console.log(tkn)
        tkn = tkn[0]
        if(tkn == null) {
            return res.status(404).json({message: "Token not found"})
        }
    }
    catch(err) {
        return res.status(500).json({message : err.message})
    }
    res.tkn = tkn
    next()
}
//
async function getUser(req, res, next) {
    let tkn
    try {
        tkn = await token.findById(req.params.id)
        if(tkn == null) {
            return res.status(404).json({message: "cannot find the user"})
        }
    }
    catch(err) {
        return res.status(500).json({message : err.message})
    }
    res.tkn = tkn
    next()
}

module.exports = router
