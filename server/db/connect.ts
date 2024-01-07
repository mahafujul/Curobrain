import mongoose from 'mongoose'

export const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`)
        console.log(`Connection to mongoDB database successfully establish !! DB HOST: ${connectionInstance.connection.host}`)    
    }catch(err){
        console.log("MongoDB connection FAILED ", err)
    }
}