const blogModel = require('../models/Blog');
// const LikesModle = require('../models/like')
const userModel = require('../models/Users')




// adding likes to blog
const Likes = async (req, res) => {
    try {

        const blogID = req.params.blogID
        const userID = req.params.userID

        const blog = await blogModel.findOne({_id : blogID})
        // const likeByAry = blog.LikedBy

        var checkID = blog.LikedBy.indexOf(userID)

        if(checkID == -1){
            blog.LikedBy.push(userID)
            await blog.save()
            res.status(200).json({"success" : "like added successfully"})
        }else{
            blog.LikedBy.splice(checkID, 1)
            blog.save()
            res.status(200).json({"success" : "dislike successfully"})
        }
        

    } catch (err) {
        console.log(err)
    }
}

module.exports = Likes



