const express = require("express")
const router = express.Router()
const categoryModel = require('../models/Category')
const blogModel = require('../models/Blog')

// create new category here
const createCateory =async function (req, res) {

    try {   

        
        const category = new categoryModel({
            category_Name: req.body.cate_name,
            userID: req.params.userID
        })

       await category.save()
       res.status(200).json(category)

    } catch(err) {
        res.status(500).json({err})
    }
}




// get all categories
const getAllCategories = async function (req, res) {

    try {
        
        const all_categories = await categoryModel.find()

       res.status(200).json(all_categories)

    } catch(err) {
        res.status(500).json({err})
    }
}



// deleting category here
const deleteCategory = async function (req, res) {

    try {
        
        const id = req.params.id

        await categoryModel.findOneAndDelete({_id : id})

       res.status(200).json({"msg" : "category deleted successfully"})

    } catch(err) {
        res.status(500).json({err})
    }
}


module.exports = {createCateory, getAllCategories ,deleteCategory}