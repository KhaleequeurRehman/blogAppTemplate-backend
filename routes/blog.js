const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const auth = require('../middleware/auth')
const blogModel = require('../models/Blog')
const {createBlog, getBlogs, getSingleBLog, dltBlog, updateBLog} = require('../controllers/blog')



// create blog here
// router('/create-blog').post(createBlog).get(getBlogs)
router.post('/createBlog/:userID',auth, createBlog)

// getting all blogs
router.get('/get-all-blog', auth, getBlogs)

// getting single blogs using id
router.get('/get-single-blog/:id', auth , getSingleBLog)

// delte blogs using id
router.get('/deleteBlog/:id', auth, dltBlog)


// update blogs using id
router.post('/updateBlog/:id', auth, updateBLog)


// export blog here
module.exports = router;