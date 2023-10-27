const jwt = require('jsonwebtoken');

function authentication(req,res,next){
    const token = req.headers.token.split(" ")[1]; //Bearer token
    if(token){
        jwt.verify(token, process.env.JWT_SECRET,(err, decoded)=>{
            if(err){
                res.json({message: "Unauthorised token."})
            }else{
                req.username = decoded.data;
                next();
            }
        })
    }else{
        res.json({message: "Token related issue."})
    }
}

module.exports = {
    jwt,
    authentication,
}