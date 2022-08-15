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
         ref : "Users"
    },
    blogID :  {
        type : mongoose.Schema.Types.ObjectId,
         ref : "Blog"
    },
   
    
},
    {
        timestamps : true
    }
)



const commentModel = mongoose.model('Comments', comment)

module.exports = commentModel