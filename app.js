require('dotenv').config()
require('./config/DB_connection')
// working
// it is the express,js
const express = require('express');
const app = express()
const path = require('path');
const fileUpload = require('express-fileupload');
const PORT = 3000 || process.env.PORT;
const bodyParser = require('body-parser')
const cors = require('cors')


// app use
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(__dirname + '/public/'));
 
app.use(cors())

// this express js moethod to upload file frm express.js
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));


// middle wares 
const Register = require('./routes/register');
const LikedAndDisLike = require('./routes/LikeAndDisLike')

const createBlog = require('./routes/blog')
const comment = require('./routes/comment')
const forgetPassword = require('./routes/forgetPassword')
const replyComnt = require('./routes/commentReply')
const category = require('./routes/category')
const contact = require('./routes/contact')

// use Router
app.use(Register)
app.use(createBlog)
app.use(comment)
app.use(forgetPassword)
app.use(replyComnt)
app.use(category)
app.use(contact)
app.use(LikedAndDisLike)


// here I am listenining the port number 3000 localhost
app.listen(PORT, function(err,data){
    if(err){
        console.log('something went wrong in server')
    }else{
        console.log('server started successfully')
    } 
})


