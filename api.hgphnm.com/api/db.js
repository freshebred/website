const express = require('express');
const router = express.Router()
const user = require('../models/db')

//get all
router.get('/get/:id', async (req, res) =>{
    if (req.params.id) {
        if (req.params.id == process.env.DB_PSW) {
            try {
                const users = await user.find()
                res.json(users)
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
//get one
router.get('/:id', getUser, (req, res)=>{
    res.send(res.usr)
})
//create one
router.post('/:id',async (req, res)=>{
    console.log('https://v1.hgphnm.com/auth/validate/' + req.params.id)
    fetch('https://v1.hgphnm.com/auth/validate' + req.params.id)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the JSON response
  })
  .then(async data =>  {
     if (data.exist && !data.timeout) {
         const users = new user({
            name: req.body.name,
            email: req.body.email,
            product: req.body.product
        })
        try {
            const newUser = await users.save()
            res.status(201).json(newUser)
        } catch(err) {
            res.status(400).json({message:err.message})
    }} else {
      // Handle the case where the conditions are not met (optional)
      res.status(412).json({message:'Token expired'})
    }
  })
  .catch(error => {
    // Handle any errors during the request or response handling
    console.error('Error:', error); 
  });

    /*const users = new user({
        name: req.body.name,
        email: req.body.email,
        product: req.body.product
    })
    try {
        const newUser = await users.save()
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({message:err.message})
    }*/
})
//
function check(data) {
    if (data.exist === true && data.timeout === false){
        return true
    }
    else {
        return false
    }
}
//
//patch one
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
router.delete('/:id',getUser,async (req, res)=>{
    try {
        await res.usr.deleteOne()
        res.json({message:'removed'})
    }
    catch (err) {
        res.status(500).json({message:err.message})
    }
})

async function getUser(req, res, next) {
    let usr
    try {
        usr = await user.findById(req.params.id)
        if(usr == null) {
            return res.status(404).json({message: "cannot find the user"})
        }
    }
    catch(err) {
        return res.status(500).json({message : err.message})
    }
    res.usr = usr
    next()
}

module.exports = router
