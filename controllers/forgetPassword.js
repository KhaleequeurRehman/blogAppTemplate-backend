const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const auth = require('../middleware/auth')
const brcypt = require('bcrypt')
const nodemailer = require('nodemailer')



const forgetPassword = async function(req,res){

    try{
        const email = req.body.email;
        // finding accoutn with email that client provided 
        const account = await userModel.findOne({email : email})
        
        // using if else condition to varify if use exist to send email other wise show not found account erro
        if(!account){
            // response if account not found with given email 
            res.status(200).json({"msg" : "no account found with this email"})

        }else{

            
        // sending email to client email
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'paywithpal2020@gmail.com', // generated ethereal user
                pass: "cyfdsvfdgyhtpjbq", // generated ethereal password
            },
        });

        var mailOptions = {
            from: 'paywithpal2020@gmail.com',
            to: account.email,
            subject: 'Forget Password',
            text: `hallow Dear it is testing email of forgetPassword`
        };

        // here I am sending email to client to forget password
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(424).json({"msg" :'forget password email not sent due to some error, kindly try later'})
            } else {
                res.status(200).json({"msg" : "email send successfully"})
            }
        });


    }
        // if something went wrong or so show this message
    }catch(err){
        res.status(500).json({err})
    }

}

// exports module 
module.exports = forgetPassword;