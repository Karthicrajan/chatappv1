const User = require("../model/user");
const bcrypt = require("bcrypt")
const generateToke = require("../config/generateToken");
const verifytoken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
const saltRounds = 10;
const hashpws = async (userPassword) =>{
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(userPassword,salt);
        return hash;
    }catch(err){
        console.error(err);
    }
}
const validate = async (password,enterdpws) =>{
    try{
        const isMatch = await bcrypt.compare(enterdpws,password);
        return isMatch;

    }catch(err){
        console.log(err);
        return false;
    }
   
}

const registerUser = async (req,res) =>{
    const password = req.body.password;
   const email = req.body.email;
   
    try{
        const isold = await User.findOne({email});
        if(isold){
            res.status(400).json({error : 'user already exists'});
            return;
            throw new Error("user already exists");


        }
        const pascode = await hashpws(req.body.password);
        const newUser = new User({
            userName:req.body.userName,
            password: pascode,
            email:req.body.email,
            profile:req.body.profile,
            token: generateToke(User.id)
        });

        const user = await newUser.save();
        res.status(200).json({
                            _id: user.id,
                            name: user.userName,
                            email: user.email,
                            pic: user.profile,
                            token: generateToke(user.id)
                        });
    }catch(err){
        console.log(err);
        res.send(err);
    }
};

const loginUser = async(req,res) =>{
        try{
            
            const{email,password} = req.body;
           
            const user = await User.findOne({email : req.body.userName});
            
            
            if(user &&  await validate(user.password,req.body.password)){
                res.status(200).json({
                    _id: user.id,
                    name : user.userName,
                    email:user.email,
                    pic: user.profile,
                    token: generateToke(user.id)
                });
            }else{
                res.status(400).json({error : 'user not found' });
            }
            
            
        }catch(err){
            res.status(500).json(err);
        }

}



const allUser = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { userName: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = (await User.find(keyword).find({ _id: { $ne: req.user._id } }));
    res.send(users);
  });
module.exports = {registerUser, loginUser, allUser};