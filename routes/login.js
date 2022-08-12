const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = require('../controllers/login')


// user login here
router.post('/user/login', login)


// export router hhere
module.exports = router