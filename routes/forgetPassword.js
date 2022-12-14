const express = require("express")
const router = express.Router()
const userModel = require('../models/Users')
const auth = require('../middleware/auth')
const brcypt = require('bcrypt')
const nodemailer = require('nodemailer')

const {forgetPassword,newPassword} = require('../controllers/forgetPassword')

// here I am creating forget password api, to change the password or reset the password
router.post('/forget-password', auth, forgetPassword)

// new password router here
router.patch('/new-password/:id', auth, newPassword)



module.exports = router;