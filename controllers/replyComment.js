const express = require("express")
const commentReplyModel = require('../models/replyComnt')


// post replies to the comment
const replyCommentPost = async function (req, res) {

    const commentID = req.params.commentID;
    const replyMSG = req.body.reply


    const newReply = commentReplyModel({
        reply: replyMSG,
        commentID: commentID
    })

    await newReply.save();
    res.status(200).json({ newReply })
}


// getting all repies with commentID
const getRepliesOfComment = async function(req,res){

    try{

        const id = req.params.commentID
        const getReplies = await commentReplyModel.find({commentID : id})
        
        res.status(200).json(getReplies)


    }
    catch(err){
        res.status(500).json(err)
    }
    
}



// delete reply
const deleteReply = async function(req,res){
    
    try{

        const id = req.params.replyID;
        await commentReplyModel.findOneAndDelete({_id : id})
        res.status(200).json({"msg" : 'reply deleted successfully'})

    }
    catch(err){
        res.status(500).json({err})
    }

}


module.exports = { replyCommentPost,getRepliesOfComment , deleteReply}