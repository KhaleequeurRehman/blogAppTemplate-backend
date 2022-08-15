const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const blogModel = require('../models/Blog')
const createBog = require('../controllers/blog')
const commentModel = require('../models/comments');
const auth = require('../middleware/auth');

// get controllers
const {createComment,deleteComment,getAllSingleBlogCommnet} = require('../controllers/comment')


// post comments
router.post('/comment/:blogId/:userID',auth, createComment)


// delete comment
router.delete('/comment/:id',auth, deleteComment)


// get all single blog comments
router.get('/comment',auth,  getAllSingleBlogCommnet);




module.exports = router