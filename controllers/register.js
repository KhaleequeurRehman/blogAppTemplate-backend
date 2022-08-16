
const userModel = require('../models/Users')
const bcrypt = require('bcrypt')
const path = require('path')
const cloudinary = require('../config/cloudnry')
const jwt = require('jsonwebtoken')


// register user here
const Register = async function (req, res) {

    try {
        const email = req.body.email;
        const checkAccount = await userModel.findOne({ email: email })
        
        if (!checkAccount) {

            var hasedPass = bcrypt.hashSync(req.body.password, 10);
            const fname = req.body.fname
            const lname = req.body.lname
           
            // uploading image on cloudinary
             const result = await cloudinary.v2.uploader.upload(req.file.path);

            // create userModel
            const register = new userModel({
                fname : fname, 
                lname : lname,
                email : email, 
                password : hasedPass,
                profile_IMG :  result.url
            })

            
            // // save user in database
            await register.save();
            res.status(201).json({"success" : 'user created successfully'})

        }else{
            
            res.status(200).json({"msg" :'user already exist'})
        
        }
    } catch (error) {
        res.send({"error" : error})
    }
}







// login controller
const login = async function (req, res) {

    try {
        // get body data here
        var { email, password } = req.body;
        
        // find if account already exist
        var isAccount = await userModel.findOne({ email: email });
        if(isAccount){
            const match = await bcrypt.compare(password, isAccount.password)
            
            if(match == true){    
                // generating a token
                const token =  jwt.sign({userID : isAccount._id}, process.env.SECRET_KEY, {expiresIn : "720 Minutes"})
                
                // adding token to user detials 
                const userData= {isAccount,token : token}
                
                // sending user detials with token as a json formate
                res.status(200).json(userData)
                
            }else{

                // nvalid password here
                res.status(404).json('invalid email or password')

            }
        }else{
            // invalid email here
            res.status(404).json('invalid email or password')
        }

    } catch(err) {
        // server error I send here
        res.status(500).json("something went wrong with server")
    }
}





// get all users here
const getAlluser = async function(req,res){
    // router.get('/all-users', async function(req,res){
        
        const allUser = await userModel.find()
        
        res.status(200).json(allUser)
    
    }




//delete user here
const dltUser = async function(req,res){
    
        try{

            const _id = req.params.id;
             await userModel.findOneAndDelete({_id})
            res.status(200).json({"msg" : "User deleted successfully"})

        }catch(err){

        }
    
    }




// get single user by id
const getSingleUser = async function(req,res){
    
    try{

        const _id = req.params.id;
        const singleUser = await userModel.findOne({_id})
        if(!singleUser){
            res.status(200).json("user not found")
        }else{
            res.status(200).json(singleUser)
        }

    }catch(err){

    }

}





module.exports = {Register, login , getAlluser, dltUser,getSingleUser}