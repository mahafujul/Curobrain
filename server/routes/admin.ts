import express from 'express'
import jwt from 'jsonwebtoken'
import authentication from'../middleware/authentication';
import {Admin, Course} from '../db/index';
import cors from 'cors';
import {z} from 'zod'
const bodyParser = require('body-parser');

const route = express.Router();
route.use(cors())
//above variable 'route' contains a function

route.use(bodyParser.json());

//Input validation for SignUp Input
const signupInput = z.object({
    username: z.string().min(1).max(20).email(),
    password: z.string().min(6).max(20)
}).strict()

route.post('/signup',async (req,res)=>{
    //logic to ceate new admin
    const parsedInput = signupInput.safeParse(req.body)
    if(!parsedInput.success){
        return res.status(411).json({error: parsedInput.error});
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    if(username&&password){
        const isAdminExist = await Admin.findOne({username});
        if(!isAdminExist){
            const admin = new Admin({username,password});
            try{
                await admin.save();
                res.json({message: "Admin created successfuly.", username});
            }catch{
                res.json({message: "There is some error in admin creation", username})
            }
        }else{
            res.json({message: "Username is already taken please try with another one."});
        }
    }else{
        res.json({message: "Please enter a valid username & password"});
    }
})

route.post('/login',async (req,res)=>{
    //logic to signin admin
    const {username, password} = req.body;
    try{
        const isAdminThere = await Admin.findOne({username,password});
        if(isAdminThere){
            const token = jwt.sign({data: username}, `${process.env.JWT_SECRET}`, {expiresIn: '1h'})
            res.json({message:"You have successfully loged in.", username, token})
        }else{
            res.json({message: "Please check your username and password."})
        }
    }catch(err){
        res.json({message: "There is some error in database end."})
    }
})

route.post('/course',authentication, async(req,res)=>{
    //Logic to create a new course.
    const {title, description, price, imgUrl, published} = req.body
    if(req.body){
        try{
            const course = new Course({title, description, price, imgUrl, published});
            await course.save();
            res.json({message: "Course created successfully...", id: course._id})
        }catch(err){
            console.log(err)
        }
    }else{ 
        res.json({message: "There is something wrong..."})
    }
})

route.get('/courses',authentication, async (req, res)=>{
    //logic to get all courses
    try{
        const courses = await Course.find({});
        res.json({courses, message: "You've fetched all courses successfully."});
    }catch(err){
        console.log(err);
    }
})


route.get('/course/:courseId',authentication, async (req,res)=>{
    //logic to get a single course.
    const courseId = req.params.courseId;
    const course = await Course.findOne({_id:courseId}); //findById(courseId)
    if(course){
        res.json({course})
    }else{
        res.json({message: "Course not found."})
    }
})

route.put('/course/:courseId', authentication, async (req, res)=>{
    //logic to edit a course
    try{
        const courseId = req.params.courseId;
        const updatedCourse = req.body;
        const UpCourse = await Course.findByIdAndUpdate(courseId, updatedCourse);
        res.json({message:"Course updated successfully...", id: courseId, course: UpCourse})
    }catch(err){
        console.log(err);
    }

})

route.delete('/course/:courseId',authentication, async (req, res)=>{
    //logic to delete a course
    try{
        const courseId = req.params.courseId;
        await Course.deleteOne({_id: courseId});
        res.json({message: "Course deleted successfully", id: courseId})
    }catch(err){
        console.log(err)
    }
})


export default route;