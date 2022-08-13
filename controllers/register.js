const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const path = require('path')
const cloudinary = require('../config/cloudnry')


const Register = async function (req, res) {

    try {
        const email = req.body.email;
        const checkAccount = await userModel.findOne({ email: email })
        
        if (!checkAccount) {

            var hasedPass = bcrypt.hashSync(req.body.password, 10);
            const fname = req.body.fname
            const lname = req.body.lname
           
            // uploading image on cloudinary
             const result = await cloudinary.v2.uploader.upload(req.file.path);

            // create userModel
            const register = new userModel({
                fname : fname, 
                lname : lname,
                email : email, 
                password : hasedPass,
                profile_IMG :  result.url
            })

            
            // // save user in database
            await register.save();
            res.status(201).json({"success" : 'user created successfully'})

        }else{
            
            res.status(200).json({"msg" :'user already exist'})
        
        }
    } catch (error) {
        res.send({"error" : error})
    }
}


module.exports = Register