const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    userName:{
         type:String,
         required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profile:{
        type:String,
        default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        
    }
},{
    timestamps: true
});
module.exports = mongoose.model("User",UserSchema);