const express = require("express")
const router = express.Router()
const categoryModel = require('../models/category')
const auth = require('../middleware/auth')


// get controller
const {createCateory, getAllCategories, deleteCategory} = require('../controllers/category')

// creating category
router.post('/category/:userID', auth, createCateory)



// const get all categories 
router.get('/category',auth, getAllCategories)



// delete Category 
router.delete('/category/:id',auth, deleteCategory)


module.exports = router