const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')
const imgUpload = require('../middleware/imgUplaod')



const {createBlog, getBlogs, getSingleBLog, dltBlog, updateBLog} = require('../controllers/blog')



// create blog here
// router('/create-blog').post(createBlog).get(getBlogs)
router.post('/blog/:userID',imgUpload.single("Blog_Img"),auth, createBlog)

// getting all blogs
router.get('/blog', auth, getBlogs)

// getting single blogs using id
router.get('/blog/:id', auth , getSingleBLog)

// delte blogs using id
router.delete('/blog/:id', auth, dltBlog)


// update blogs using id
router.put('/blog/:id',imgUpload.single("Blog_Img"), auth, updateBLog)


// export blog here
module.exports = router;