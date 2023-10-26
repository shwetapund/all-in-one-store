import express from "express"
import mongoose  from "mongoose"
import User from "./model/User.js";
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

app.post('/signup', async (req,res)=>{
    const {name, email,password, mobile, address, gender} = req.body;

    const obj = new User({
        name:name,
        email:email,
        password:password,
        mobile:mobile,
        address:address,
        gender:gender
    })
    const savedUser = await obj.save();

    res.json({
        success:true,
        Data:savedUser,
        message:"User added successfully"
    })
})



app.listen(PORT, ()=>{
    console.log(`your server is running on ${PORT}`)
})


