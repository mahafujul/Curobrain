const express = require('express');

const {User, Course} = require('../db/index');
const {jwt, privateKey, authentication} = require('../middleware/authentication')

const route = express.Router();


route.post('/signup',async(req,res)=>{
    //logic to create a new user
    const {username,password} = req.body;
    //Check whether user is already exist or not.
    const userExist = await User.findOne({username});
    if(userExist){
        res.json({message: "User name is already taken.."})
    }else{
        const user = new User({username,password});
        await user.save();
        res.json({message:'User created successfully..',username})
    }
})

route.post('/login',async(req,res)=>{
    //logic to sign in a user
    const {username, password} = req.body;
    const isUserExist = await User.findOne({username,password});
    if(isUserExist){
        const token = jwt.sign({data:username}, privateKey, {expiresIn:'1h'});
        res.json({message:"You have loged is successfully.",token})
    }else{
        res.json({message:"Please check username and password.."})
    }
})

route.get('/courses',authentication, async(req, res)=>{
    //logic to get all purchased courses
    try{
        const user = await User.findOne({username: req.username}).populate('purchasedCourses'); //This populate function fetches the actual data from the given reference.
        res.json({message: "These all are the courses that you are already enrolled in..",courses: user.purchasedCourses});
    }catch(err){
        res.json({message: "Someting went wrong.."})
    }
})

route.get('/course',authentication, async (req, res)=>{
    //logic to view all published courses
    try{
        const courses = await Course.find({published: true});
        res.json({courses});
    }catch(err){
        res.json({message: "There is something wrong.."})
    }
})

route.post('/course/:courseId',authentication, async(req,res)=>{
    //logic to purchase a course
    const courseId = req.params.courseId;
    //First, check if the course exists or not.
    const isCourseExist = await Course.findOne({_id: courseId});
    // if the course exist control will go inside if statement otherwise will go inside the else statement.
    if(isCourseExist){
        const user = await User.findOne({username: req.username});
        if(user){
            user.purchasedCourses.push(isCourseExist._id);
            // await User.findOneAndUpdate({username: req.username},{ $set: {purchasedCourses: user.purchasedCourses} },{ new: true })
            await user.save();
            res.json({message: "Course purchased successfully.."})
        }else{
            res.json({message: "User does not exist.."});
        }
    }else{
        res.json({message: "Course does not exist.."})
    }
})

route.get('/course/:courseId',authentication, async (req, res)=>{
    //logic to get a specific course
    const courseId = req.params.courseId;
    const course = await Course.findOne({_id: courseId});
    if(course){
        res.json({course});
    }else{
        res.json({message: "Course does not exist.."})
    }
})

module.exports = route;