const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const bcrypt = require('bcrypt')


const Register = async function (req, res) {

    try {
        const email = req.body.email;
        const checkAccount = await userModel.findOne({ email: email })

        if (!checkAccount) {
            var hasedPass = bcrypt.hashSync(req.body.password, 10);
            const {fname, lname,email,password} = req.body;
            // create userModel
            const register = new userModel({fname, lname,email, password : hasedPass})
            // save user in database
            register.save()
            res.status(201).json({"success" : 'user created successfully'})
        }else{
            res.status(200).json({"msg" :'user already exist'})
        }
    } catch (error) {
        res.status(404).json({"msg" :"add correct user detials"})

    }

}


module.exports = Register