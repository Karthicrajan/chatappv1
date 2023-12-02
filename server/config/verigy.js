const jwt = require("jsonwebtoken");
const verifytoken = (data) =>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjU0ZGI3NDdhMmQwNGIzZGRlZTA5NzExIiwiaWF0IjoxNjk5NjA5NDI0LCJleHAiOjE2OTk2MTMwMjR9.ZCl5mzQmBAcLwOPTnR27vLcoZIRQ4J5uQJaqiNKVP5E';
    const key = 'chatAppkar';
    jwt.verify(data,key,(err,decoded)=>{
        if(err){
            return err;
        }else{
            return decoded;
        }
    })
    // return data;
}
module.exports = verifytoken;