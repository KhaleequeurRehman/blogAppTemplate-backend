const express = require("express")
const commentModel = require('../models/Comments')
const blogModel = require('../models/Blog')
const userModel = require('../models/Users')



// post comments
const createComment = async function (req, res) {

    try {


        const userId = req.params.userID;
        const blogID = req.params.blogId;

        // getting user
        const currentUser = await userModel.findOne({ _id: userId })


        // finding crrent blog model
        const blog = await blogModel.findOne({ _id: blogID })

        const createComment = await commentModel({
            comment: req.body.comment,
            userID: userId,
            blogID: blogID
        })

        // saving comment to databse
        await createComment.save()

        //  pushing id to current blog
        blog.comments.push(createComment._id)

        //  adding comment id in user model
        currentUser.comments.push(createComment._id)
        //  saving comment model
        currentUser.save()

        //  saving blog model also 
        await blog.save()

        //  sending comment json formate
        res.status(201).json(createComment)

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}



// delete comment
const deleteComment = async function (req, res) {

    try {
        // getting ID from params
        const id = req.params.id;

        // getting comment model
        const comment = await commentModel.findOne({ _id: id })

        if (!comment) {
            res.status(200).json({ "success": "message deleted already" })
        } else {

            // getting blog model
            const getblog = await blogModel.findOne({ _id: comment.blogID })
            const user = await userModel.findOne({_id : getblog.author})
                
            // gettimg user Model
            // await commentModel.findOneAndDelete({ _id: id })

            const commentsIDs = getblog.comments
            const findIndex = commentsIDs.indexOf(comment._id);
            commentsIDs.splice(findIndex, 1);


            getblog.save()

            const comments = user.comments
            const findCurrentIndex = comments.indexOf(id)
            comments.splice(findCurrentIndex, 1);
            user.save()


            res.status(200).json({ "seccess": "comment deleted successfully" })

        }

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}






// get all single blog comments
const getAllSingleBlogCommnet = async function (req, res) {

    try {

        const allComments = await commentModel.find()

        if (allComments) {
            res.status(200).json(allComments)
        } else {
            res.status(200).json({ "msg": "comments not found" })
        }


    } catch (err) {
        res.status(500).json(err)
    }

}



module.exports = { createComment, deleteComment, getAllSingleBlogCommnet }