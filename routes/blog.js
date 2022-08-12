const express = require("express")
const router = express.Router()
const userModel = require('../models/users')
// const auth = require('../middlware.js/auth')
const blogModel = require('../models/Blog')


// create blog here
router.post('/create-blog', async function (req, res) {

    try {        
            const createBlog = new blogModel({
            title: req.body.title,
            content: req.body.content,
            Blog_Img: req.body.Blog_Img,
            Blog_Category: req.body.Blog_Category,
        })

        await createBlog.save()
        res.status(200).json({ "success": 'blog created successfully' })

    } catch(err) {
        console.log(err)
    }
})


// export blog here
module.exports = router;