const express = require('express');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const mongoose = require('mongoose');
const cors = require('cors');
const { authentication } = require('./middleware/authentication');

const app = express();

const port = 3000;

app.use(express.json()); //we are using this line to parse the incommig requests
app.use('/admin',adminRoute);
app.use('/user',userRoute);
app.use(cors())
//we are passing a path and a function/method as arguments on the above method call.

app.get('/me',authentication, (req, res)=>{
    res.json({username: req.username});
})

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})

mongoose.connect('mongodb+srv://mahafujul:Loveyou2%40@cluster0.mkfvbr8.mongodb.net/curobrain?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log('Connection to mongoDB database successfully establish')
}).catch((err)=>{
    console.log(err)
})