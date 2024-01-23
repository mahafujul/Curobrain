import express from 'express';
import adminRoute from './routes/admin';
import userRoute from './routes/user';
// import cors from 'cors';
import authentication from './middleware/authentication';
import dotenv from 'dotenv';
import { connectDB } from './db/connect';

dotenv.config();
const app = express();

const port = 3000;

app.use(express.json()); //we are using this line to parse the incommig requests
app.use('/admin',adminRoute);
app.use('/user',userRoute);
// app.use(cors())
//we are passing a path and a function/method as arguments on the above method call.

app.get('/me',authentication, (req, res)=>{
    res.json({username: req.headers.username});
})

app.use(express.static("public"));
app.use("/*",(req,res)=>{
    res.sendFile(__dirname+'../public/index.html')
})

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})

//Connect with database
connectDB();