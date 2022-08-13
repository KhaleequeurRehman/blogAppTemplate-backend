const express = require("express")

const commentModel = require('../models/comments')



// post comments
const createComment = async function (req, res) {

    try {

        const userId = req.params.userID;
        const blogID = req.params.blogId;
        const createComment = await commentModel({
            comment : req.body.comment,
            userID : userId,
            blogID : blogID
        })

            await createComment.save()
        res.status(201).json(createComment)
    } catch(err) {
        res.status(500).json(err)
    }

}



// delete all comments
const deleteComment = async function (req, res) {

    try {
        const id = req.params.id;
        const deleteComnt = await commentModel.findOneAndDelete({_id:id})
        console.log(deleteComnt)
       
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