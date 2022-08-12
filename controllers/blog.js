
const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blogModel = require('../models/Blog')




// creating blog here
const createBlog = async function (req, res) {

    try {         
            const userID = req.params.userID
            const createBlog = new blogModel({
            author : userID,
            title: req.body.title,
            content: req.body.content,
            Blog_Img: req.body.Blog_Img,
            Blog_Category: req.body.Blog_Category,
        })

        await createBlog.save()
        res.status(200).json({ "success": 'blog created successfully' })

    } catch(err) {
        console.log(err)
    }
}




// get all blogs
const getBlogs = async function(req,res){

    try{

        const allBLog = await blogModel.find()
        
        res.status(200).json(allBLog)

    }catch(err){

        res.status(500).json(err)

    }

}


// get single blog using id
getSingleBLog = async function(req,res){

    try{

       const id = req.params.id
       const singleBlog = await blogModel.findOne({_id : id})
       if(!singleBlog){
           res.status(200).json({"msg" : "blog does not exist"})
       }else{
           res.status(200).json(singleBlog)
       }


    }catch(err){

        res.status(500).json(err)

    }

}




// delete Blog here
const dltBlog = async function(req,res){

    try{

       const id = req.params.id
       
       const deleteBLog = await blogModel.findOneAndDelete({_id : id})
        if(!deleteBLog){
            res.status(200).json({"msg":"blog already deleted"})
        }else{
            res.status(200).json({"msg":"blog deleted Successfully"})
        }

    }catch(err){

        res.status(500).json(err)

    }

}





// update BLog here
const updateBLog = async function(req,res){

    try{

       var id = req.params.id;

        const update = await blogModel.findOneAndUpdate({
            title: req.body.title,
            content: req.body.content,
            Blog_Img: req.body.Blog_Img,
            Blog_Category: req.body.Blog_Category,
        });

        res.status(201).json(update)
        
    }catch(err){

        res.status(500).json(err)

    }

}



module.exports = {createBlog, getBlogs, getSingleBLog, dltBlog, updateBLog}