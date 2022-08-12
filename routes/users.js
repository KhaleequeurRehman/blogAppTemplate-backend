const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const auth = require('../middleware/auth')

const {getAlluser, dltUser,getSingleUser} = require('../controllers/users')


// getting all users with authentication
router.get('/user/get-all',auth, getAlluser) 

// delete user
router.get('/user/delete/:id',auth, dltUser) 
router.get('/user/get-single-user/:id',auth, getSingleUser) 


// exporting the router
module.exports = router 