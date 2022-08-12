const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const Register = require('../controllers/register')


// user register here
router.post('/user/register', Register)


// export model here
module.exports = router