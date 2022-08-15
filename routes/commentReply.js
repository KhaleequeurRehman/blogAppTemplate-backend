const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth');



// geting controlles
const {replyCommentPost,getRepliesOfComment , deleteReply} = require('../controllers/replyComment')

// post reply comments
router.post('/reply/comment/:commentID',auth, replyCommentPost)


// get all replies of exact comment
router.get('/reply/comment/:commentID',auth, getRepliesOfComment)


// delete reply of comment
router.get('/reply/delete/:replyID',auth, deleteReply)




module.exports = router