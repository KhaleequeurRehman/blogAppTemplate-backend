const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
const auth = require('../middleware/auth')
const blogModel = require('../models/Blog')
const {createBlog, getBlogs, getSingleBLog, dltBlog, updateBLog} = require('../controllers/blog')



// create blog here
// router('/create-blog').post(createBlog).get(getBlogs)
router.post('/createBlog/:userID',auth, createBlog)
router.get('/get-all-blog', auth, getBlogs)
router.get('/get-single-blog/:id', auth , getSingleBLog)
router.get('/deleteBlog/:id', auth, dltBlog)
router.post('/updateBlog/:id', auth, updateBLog)


// export blog here
module.exports = router;