const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




// login controller
const login = async function (req, res) {

    try {
        // get body data here
        var { email, password } = req.body;

        // find if account already exist
        var isAccount = await userModel.findOne({ email: email });
        if(isAccount){
            const match = await bcrypt.compare(password, isAccount.password)
            
            if(match){

                // generating a token
                const token =  jwt.sign({userID :isAccount._id}, process.env.SECRET_KEY)

                // adding token to user detials 
                const userData= {isAccount,token : token}
                
                // sending user detials with token as a json formate
                res.status(200).json(userData)
            }else{

                // nvalid password here
                res.status(404).json('invalid email or password')

            }
        }else{
            // invalid email here
            res.status(404).json('invalid email or password')
        }

    } catch(err) {
        // server error I send here
        res.status(500).send(err)
    }
}



module.exports = login