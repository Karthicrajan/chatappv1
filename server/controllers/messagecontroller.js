const message = require("../model/messageModel");

const createMsg = async (req,res) =>{
try{
    const data = {
        sender : req.body.userId,
        content : req.body.message,
        chat: req.body.chatId,
    }
    const Msg =  new message(data);
    const newMsg = (await Msg.save());
    res.status(200).json(newMsg);
}catch(err){
    res.status(500).json(err);
}
}

const fetchMessage = async (req,res) => {
    const chatId = req.query.chatId;
    try{
        const msg = await message.find({chat : chatId}).populate("sender","-password");
        
        res.status(200).json(msg);
    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = {createMsg, fetchMessage};