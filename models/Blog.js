const mongoose = require('mongoose')



const blog = new mongoose.Schema({
    author :  {
        type : mongoose.Schema.Types.ObjectId,
         ref : "users"
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
             ref : "comments"
        }
    ],
    Blog_Img : {
        type : String,
        required  : [true , "image must be provided"]
    },
    Blog_Category : {
        type : String,
        required  : [true , "category must be provided"]
    },

    categoryID :  {
        type : mongoose.Schema.Types.ObjectId,
         ref : "category"
    }
    
},
{ timestamps: true }
)


const blogModel = mongoose.model('blog', blog)

module.exports = blogModel