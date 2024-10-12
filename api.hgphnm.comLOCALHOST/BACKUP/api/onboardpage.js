const express = require('express');
const router = express.Router()

router.get('/',(req, res)=>{
    res.status(404).json({message:"nothing to see here:P"})
})
router.post('/',(req, res)=>{
    res.status(404).json({message:"nothing to see here:P"})
})
router.put('/',(req, res)=>{
    res.status(404).json({message:"nothing to see here:P"})
})
router.patch('/',(req, res)=>{
    res.status(404).json({message:"nothing to see here:P"})
})
router.delete('/',(req, res)=>{
    res.status(404).json({message:"nothing to see here:P"})
})

module.exports = router