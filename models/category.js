const mongoose = require('mongoose')



const categorySchema = new mongoose.Schema({
    category_Name :  {
            type  : String,
            required : [true, "category name must be provided"]
    },

    adminID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required  : [true, "category adminID must be provided"]
    },

    blogs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "blog"
        }
    ]
    
},
{ timestamps: true }
)


const category = mongoose.model('category', categorySchema)

module.exports = category