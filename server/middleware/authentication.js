const jwt = require('jsonwebtoken');

const privateKey = 'Lkjhgfdsa'

function authentication(req,res,next){
    const token = req.headers.token;
    jwt.verify(token, privateKey,(err, decoded)=>{
        if(err){
            res.json({message: "Unauthorised token."})
        }else{
            next();
        }
    })
}

module.exports = {
    jwt,
    authentication,
    privateKey
}