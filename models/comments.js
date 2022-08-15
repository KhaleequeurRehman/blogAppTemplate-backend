const mongoose = require('mongoose')


const comment = new mongoose.Schema({

    comment : {
        type : String,
        required : [true, "comment must be provided"],
    },
    replies : [
        {
            
                type : mongoose.Schema.Types.ObjectId,
                 ref : "replyComnt"
            
        }
    ],
    
    userID : {
        type : mongoose.Schema.Types.ObjectId,
         ref : "users"
    },
    blogID :  {
        type : mongoose.Schema.Types.ObjectId,
         ref : "blog"
    },
   
    
},
    {
        timestamps : true
    }
)



const commentModel = mongoose.model('comments', comment)

module.exports = commentModel