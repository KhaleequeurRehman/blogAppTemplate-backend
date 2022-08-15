const mongoose = require('mongoose')



const categorySchema = new mongoose.Schema({
    category_Name :  {
            type  : String,
            required : [true, "category name must be provided"]
    },

    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required  : [true, "category adminID must be provided"]
    },

    blogs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Blog"
        }
    ]
    
},
{ timestamps: true }
)


const category = mongoose.model('Category', categorySchema)

module.exports = category