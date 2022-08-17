
const express = require("express")
const blogModel = require('../models/Blog')
const cloudinary = require('../config/cloudnry')
const path = require('path')
const userModel = require('../models/Users');
const categoryModel = require("../models/Category")



// creating blog here
const createBlog = async function (req, res) {
    try {         
            const userID = req.params.userID;
            const categoryID = req.params.catID;

            // uploading thumbnail of blog
            const result = await cloudinary.v2.uploader.upload(req.file.path);

            // getting category Model
            const category = await categoryModel.findOne({_id : categoryID})

            
            // getting all models
            const user = await userModel.findOne({_id : userID})

            const createBlog = new blogModel({
            author : userID,
            title: req.body.title,
            content: req.body.content,
            Blog_Img: result.url,
            categoryID : categoryID
        })

        // saving blog
        await createBlog.save()

        // saving blogId to User 
        user.Blogs.push(createBlog._id)
        
        //saving blogID to Category
        category.blogs.push(createBlog._id)

        // saving User
        await user.save()

        // saving categoryModel 
        await category.save()

        // sending response
        res.status(200).json(createBlog)

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
        
    //    getting blog by ID
       const blog = await blogModel.findOne({_id : id})
       //    find currentCategory related to blog 

       if(!blog){
            res.status(200).json({"msg":'blog already been deleted'})
       }else{
       
       
        const currentCategory = await categoryModel.findOne({_id : blog.categoryID})
       
    //    getting user from Blog Author
       const user = await userModel.findOne({_id : blog.author})

    //    deleting blog from databse
    await blogModel.findOneAndDelete({_id : id})

        // finding index of blogID in usrModel BLogAry
       var blogsAry = user.Blogs // getting blogs from userModel 
       const indexOfBLogID = blogsAry.indexOf(id); //getting index number of ID in user model BLog Aray
       user.Blogs.splice(indexOfBLogID, 1) // deleting that index number from aray in userMOdel Blog Ary
    
       await user.save()
        

    // deleting BlogID from category model
    var blogAry = currentCategory.blogs;
    var idIndex = blogAry.indexOf(id)
    currentCategory.blogs.splice(idIndex, 1)

    await currentCategory.save()

    // sending response 
    res.status(200).json({"msg":"blog deleted successfully"})

    }


    }catch(err){
        console.log(err)
        res.status(500).json(err)

    }

}





// update BLog here
const updateBLog = async function(req,res){

    try{

       var id = req.params.id;
       const result = await cloudinary.v2.uploader.upload(req.file.path);
        const update = await blogModel.findOneAndUpdate({
            title: req.body.title,
            content: req.body.content,
            Blog_Img: result.url,
            Blog_Category: req.body.Blog_Category,
        });

        res.status(201).json(update)

    }catch(err){
        res.status(500).json(err)
    }

}



module.exports = {createBlog, getBlogs, getSingleBLog, dltBlog, updateBLog}