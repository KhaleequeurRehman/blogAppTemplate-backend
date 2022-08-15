const mongoose = require('mongoose')


const comment = new mongoose.Schema({

    reply : {
        type : String,
        required : [true, "reply must be provided"],
    },
    commentID : {
        type : mongoose.Schema.Types.ObjectId,
         ref : "comments"
    }
    
},
    {
        timestamps : true
    }
)



const replyComnt = mongoose.model('replyComnt', comment)

module.exports = replyComnt