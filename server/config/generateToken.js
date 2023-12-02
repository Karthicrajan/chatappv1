const jwt = require("jsonwebtoken");
const secretkey = 'chatAppkar';

const generateToke = (id) =>{
    // console.log(jwt.sign(data,secretkey,{expiresIn: '1h'}));
    return  jwt.sign({id},secretkey,{expiresIn: '1h'});
}
const verifytoken = (data) =>{
    return data;
}
module.exports = generateToke;
// module.exports = verifytoken;