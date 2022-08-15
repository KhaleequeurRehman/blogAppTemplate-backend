require('dotenv').config()
require('./config/mongoose')
// working
// it is the express,js
const express = require('express');
const app = express()
const path = require('path');
const fileUpload = require('express-fileupload');
const PORT = 3000 || process.env.PORT;
const brycpt = require('bcrypt')
const bodyParser = require('body-parser')



// app use
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(__dirname + '/public/'));

// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));


// middle wares 
const Register = require('./routes/register');
const login = require('./routes/login');
const allUser = require('./routes/users');
const createBlog = require('./routes/blog')
const comment = require('./routes/comment')
const forgetPassword = require('./routes/forgetPassword')
const replyComnt = require('./routes/commentReply')

// use Router
app.use(Register)
app.use(login) 
app.use(allUser)
app.use(createBlog)
app.use(comment)
app.use(forgetPassword)
app.use(replyComnt)




app.listen(PORT, function(err,data){
    if(err){
        console.log('something went wrong in server')
    }else{
        console.log('server started successfully')
    } 
})


