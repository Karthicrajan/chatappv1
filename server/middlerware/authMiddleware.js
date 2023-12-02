const jwt = require("jsonwebtoken");
const User = require("../model/user");
const asyncHandler = require("express-async-handler");
const sk = "chatAppkar"
const protect = asyncHandler(async(req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
           
            const decoded = jwt.verify(token,sk);
            req.user = await User.findById(decoded.id).select("-password");
            // console.log("data",req.user);
            next();
    
        }catch(err){
            res.status(401).send("No auth");
            
        }
    }
    if(!token){
        res.status(401).send("No token");
        
    }
});
module.exports = { protect }; 