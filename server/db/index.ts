import mongoose from 'mongoose'

//Define all the schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imgUrl: String,
    published: Boolean
})

//Define all the models/collections.
export const User = mongoose.model('User', userSchema)
export const Admin = mongoose.model('Admin', adminSchema)
export const Course = mongoose.model('Course', courseSchema)
