const express = require("express")
const router = express.Router()
const userModel = require('../models/Users')
const bcrypt = require('bcrypt')
const {Register, login , getAlluser, dltUser,getSingleUser} = require('../controllers/register')
const imgUpload = require('../middleware/imgUplaod')
const auth = require('../middleware/auth')

// user register here
router.post('/user/register',imgUpload.single("profile_IMG"),Register)


// user login here
router.post('/user/login', login)

// getting all users with authentication
router.get('/user',auth, getAlluser) 

// delete user
router.delete('/user/:id',auth, dltUser) 

// geting single user 
router.get('/user/:id',auth, getSingleUser) 

// export model here
module.exports = router