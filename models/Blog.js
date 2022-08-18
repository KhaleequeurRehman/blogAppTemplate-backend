const mongoose = require('mongoose')



const blog = new mongoose.Schema({
    author :  
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Users"
        },

    title : {
        type : String,
        required : [true, "title must be added"]
    },
    content : {
        type : String,
        required : [true, "content must be provided"]
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
             ref : "Comments"
        }
    ],
    Blog_Img : {
        type : String,
        required  : [true , "image must be provided"]
    },

    categoryID :  {
        type : mongoose.Schema.Types.ObjectId,
         ref : "Category"
    },

    LikedBy : [
        {
            type : mongoose.Schema.Types.ObjectId,
        }
    ],
    
},
{ timestamps: true }
)


const blogModel = mongoose.model('Blog', blog)

module.exports = blogModel