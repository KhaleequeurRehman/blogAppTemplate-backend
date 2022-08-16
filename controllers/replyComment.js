const express = require("express")
const commentReplyModel = require('../models/ReplyComnt')
const commentModel = require("../models/Comments")



// post replies to the comment
const replyCommentPost = async function (req, res) {

    try {

        const commentID = req.params.commentID;
        const replyMSG = req.body.reply

        const comment = await commentModel.findOne({ _id: commentID })

       


        const newReply = commentReplyModel({
            reply: replyMSG,
            commentID: commentID
        })

        await newReply.save();
        comment.replies.push(newReply._id)

        comment.save()
        res.status(200).json({ newReply })

    } catch {

    }
}





// getting all repies with commentID
const getRepliesOfComment = async function (req, res) {

    try {

        const id = req.params.commentID
        const getReplies = await commentReplyModel.find({ commentID: id })

        res.status(200).json(getReplies)


    }
    catch (err) {
        res.status(500).json(err)
    }

}



// delete reply
const deleteReply = async function (req, res) {

    try {

        const id = req.params.replyID;

        const replies = await commentReplyModel.findOne({_id :id})
        const comment = await commentModel.findOne({_id : replies.commentID})
        const replyAry = comment.replies

        var findIndex = replyAry.indexOf(replies._id)
        replyAry.splice(findIndex, 1);

        await commentReplyModel.findOneAndDelete({ _id: id });
        comment.save()
        res.status(200).json({ "msg": 'reply deleted successfully' });

    }
    catch (err) {
        
        res.status(500).json({ err })
    }

}


module.exports = { replyCommentPost, getRepliesOfComment, deleteReply }