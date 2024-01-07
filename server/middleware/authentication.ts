import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"

export default function authentication(req: Request,res: Response,next: NextFunction){
    let token = ''
    if(typeof req.headers.token === 'string'){
        token = req.headers.token.split(" ")[1]; //Bearer token
    }
    if(token){
        jwt.verify(token, `${process.env.JWT_SECRET}`,(err: any, decoded: any)=>{
            if(err){
                res.json({message: "Unauthorised token."})
            }else{
                req.headers.username = decoded.data;
                next();
            }
        })
    }else{
        res.json({message: "Token related issue."})
    }
}
