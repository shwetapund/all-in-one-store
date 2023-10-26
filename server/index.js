import express from "express"
import mongoose  from "mongoose"
import dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000

const connectMongoDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    if(conn){
        console.log("MongoDB is connected")
    }
}
connectMongoDB();


app.listen(PORT, ()=>{
    console.log(`your server is running on ${PORT}`)
})

