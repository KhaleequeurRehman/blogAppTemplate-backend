const mongoose = require('mongoose')

// naming databse 
mongoose.connect('mongodb://localhost:27017/BlogApp',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('mongoose connect successfully')
}).catch((err)=>{
    console.log(err)
})

