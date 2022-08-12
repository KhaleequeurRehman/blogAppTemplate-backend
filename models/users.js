const mongoose = require('mongoose')
const validator = require('validator')

const users = new mongoose.Schema({
    fname : {
        type : String,
        required : [true,"fname is required"],
    },
    lname : {
        type : String,
        required : [true, "lname is required"],
    },
    email : {
        type : String,
        required : [true,"enter email"],
        unique : [true,"this email is already exist"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password :{
        type : String,
        required : [true, "password is requird"],
        validate(value){
            if(value.length < 8){
                throw new Error('Password must be more than 8 character')
            }
        }
    },

    Blogs : [
        {
            type : mongoose.Schema.Types.ObjectId,
             ref : "blog"
        }
    ],
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
             ref : "comments"
        }
    ]
    

})


const userModel =  mongoose.model('users', users)

module.exports = userModel