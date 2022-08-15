const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth');



// geting controlles
const {replyCommentPost,getRepliesOfComment , deleteReply} = require('../controllers/replyComment')

// post reply comments
router.post('/reply/:commentID',auth, replyCommentPost)


// get all replies of exact comment
router.get('/reply/:commentID',auth, getRepliesOfComment)


// delete reply of comment
router.delete('/reply/:replyID',auth, deleteReply)




module.exports = router