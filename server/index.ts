import express from 'express';
import adminRoute from './routes/admin';
import userRoute from './routes/user';
import mongoose from 'mongoose';
import cors from 'cors';
import authentication from './middleware/authentication';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const port = 3000;

app.use(express.json()); //we are using this line to parse the incommig requests
app.use('/admin',adminRoute);
app.use('/user',userRoute);
app.use(cors())
//we are passing a path and a function/method as arguments on the above method call.

app.get('/me',authentication, (req, res)=>{
    res.json({username: req.headers.username});
})

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})

mongoose.connect(`${process.env.MONGO_URL}`,{dbName: 'curobrain'}).then(()=>{
    console.log('Connection to mongoDB database successfully establish')
}).catch((err)=>{
    console.log(err)
})