const chatModel = require("../model/chatModel");
const User = require("../model/user");


const accesschat = async(req,res) => {
  
const  userId   = req.body.userId;
  
  if(!userId){
    return res.sendStatus(400);
  }
  var isChat = await chatModel.find({
      isGroupChat: false,
      $and : [
      {users : {$elemMatch: {$eq: req.body.user_id}}},
      {users :{$elemMatch:{$eq:userId}}},
      ]
  }).populate("users","-password").populate("latestMessage");

  
  console.log("afeter");
  isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "userName profile email",
    });
    
  

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatname: "sender",
        isGroupChat: false,
        users: [req.body.user_id, userId],
      };

      try {
        const createdChat = (await chatModel.create(chatData)).populate('users');
        
        const FullChat = await chatModel.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
}

const fetchChat = async(req,res) =>{
  const currentId = req.query.userId;
  try{
    const chatData = await chatModel.find({ users : {$elemMatch: {$eq: currentId}}}).populate("users","-password")
    // .populate("latestMessage").sort({updatedAt: -1})
    // .then(async (result) => {
    //   result = await User.populate(result,{
    //     path:"latestMessage.sender",
    //     select: "userName profile email",
    //   })
    //   res.status(200).send(result);
    // })
    res.status(200).send(chatData);
  }catch(err){
    res.status(500).json(err);
  }
  

}

module.exports = {accesschat, fetchChat};