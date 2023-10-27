import express from "express"
import mongoose  from "mongoose"
import User from "./model/User.js";
import Product from "./model/Product.js";
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

//signup
app.post('/signup', async (req,res)=>{
    const {name, email,password, mobile, address, gender} = req.body;
try{
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
}
catch(e){
    res.json({
        success:false,
        message:e.message
    })
}
})

//login

app.get('/login', async (req,res)=>{
    const {email, password} = req.body;

    const findUser = await User.findOne({
        email:email,
        password:password
    }).select('name mobile address gender')
    if(!findUser){
        return res.json({
            success:false,
            message:'invalid credential'
        })
    }

    res.json({
        success:true,
        data: findUser,
        message: "login successfully"
    })
})

//app.post('/products')

app.post('/products', async (req,res)=>{
    const {name, discription, brand, price, image} = req.body;

    const ProductData = await new Product({
        name:name,
        discription:discription,
        brand:brand,
        price:price,
        image:image
    })

   try{
    const savedProduct = await ProductData.save();

    res.json({
        success:true,
        data: savedProduct,
        message:"successfully created Product"
    })
   }
   catch(e){
    res.json({
       success:false,
       message:e.message

    })
   }
})






//app.post('/product')
//app.put('/product/:id)

//app.get('/product/:id)

//app.delete('/product/:id)
//app.search('/product?:)



app.listen(PORT, ()=>{
    console.log(`your server is running on ${PORT}`)
})


