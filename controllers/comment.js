const express = require("express")
const commentModel = require('../models/Comments')
const blogModel = require('../models/Blog')




// post comments
const createComment = async function (req, res) {

    try {

        
        const userId = req.params.userID;
        const blogID = req.params.blogId;

        // finding crrent blog model
        const blog = await blogModel.findOne({_id : blogID})

        const createComment = await commentModel({
            comment : req.body.comment,
            userID : userId,
            blogID : blogID
        })

        // saving comment to databse
         await createComment.save()

        //  pushing id to current blog
         blog.comments.push(createComment._id)

        //  saving blog model also 
         await blog.save()

        //  sending comment json formate
        res.status(201).json(createComment)

    } catch(err) {
        res.status(500).json(err)
    }

}



// delete comment
const deleteComment = async function (req, res) {

    try {
        const id = req.params.id;

        const comment = await commentModel.findOne({_id : id})

        const getblog = await blogModel.findOne({_id : comment.blogID})

        const commentsIDs = getblog.comments

        const findIndex = commentsIDs.indexOf(comment._id);
        commentsIDs.splice(findIndex, 1);

        const deleteComnt = await commentModel.findOneAndDelete({_id:id})
       
        getblog.save()
        
        res.status(200).json({"msg" : "comment deleted successfully"})
        
        
    } catch(err) {
        res.status(500).json(err)
    }

}






// get all single blog comments
const getAllSingleBlogCommnet = async function (req, res) {

    try {
        
        const allComments = await commentModel.find()

        if(allComments){
            res.status(200).json(allComments)
        }else{
            res.status(200).json({"msg" : "comments not found"})
        }

        
    } catch(err) {
        res.status(500).json(err)
    }

}



module.exports = {createComment,deleteComment,getAllSingleBlogCommnet}