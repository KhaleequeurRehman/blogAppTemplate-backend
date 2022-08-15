const express = require("express")
const router = express.Router()
const contact = require('../controllers/contact')
const auth = require('../middleware/auth')


// this is the router for contact this is the post router
router.post('/contact',auth,contact)



module.exports = router