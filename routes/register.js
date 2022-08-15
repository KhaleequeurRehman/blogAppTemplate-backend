const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const Register = require('../controllers/register')
const imgUpload = require('../middleware/imgUplaod')

// user register here
router.post('/user/register',imgUpload.single("profile_IMG"),Register)



// export model here
module.exports = router