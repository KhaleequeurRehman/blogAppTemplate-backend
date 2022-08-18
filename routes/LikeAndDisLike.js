const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth')
const Likes = require('../controllers/LikeAndDislike')


// likes to blog
router.post('/like/:blogID/:userID', auth ,Likes)


module.exports = router

