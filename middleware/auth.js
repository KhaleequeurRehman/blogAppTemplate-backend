const jwt = require('jsonwebtoken');


// this is authentication to authenticate the user here
const auth = (req, res, next)=>{
    const token =  req.headers["token"]; 
    if(!token){
       return res.status(403).json({msg:"token is require"})
    }   

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
      } catch (err) {
        return res.status(401).json({msg : "Invalid Token"});
      }

      return next()
} 



module.exports = auth