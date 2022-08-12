const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
// const auth = require('../middlware.js/auth')

// getting all users
// router.get('/all-users',auth, async function(req,res){
router.get('/all-users', async function(req,res){
    
    const allUser = await userModel.find()
    
    res.status(200).json(allUser)

})

// exporting the router
module.exports = router 