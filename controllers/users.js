const express = require("express")
const router = express.Router()
const userModel = require('../models/users')


// get all users here
const getAlluser = async function(req,res){
    // router.get('/all-users', async function(req,res){
        
        const allUser = await userModel.find()
        
        res.status(200).json(allUser)
    
    }




//delete user here
const dltUser = async function(req,res){
    
        try{

            const _id = req.params.id;
             await userModel.findOneAndDelete({_id})
            res.status(200).json({"msg" : "User deleted successfully"})

        }catch(err){

        }
    
    }




// get single user by id
const getSingleUser = async function(req,res){
    
    try{

        const _id = req.params.id;
        const singleUser = await userModel.findOne({_id})
        if(!singleUser){
            res.status(200).json("user not found")
        }else{
            res.status(200).json(singleUser)
        }

    }catch(err){

    }

}



module.exports = {getAlluser, dltUser,getSingleUser}