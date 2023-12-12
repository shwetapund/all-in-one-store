import express from "express"
import mongoose  from "mongoose"
import User from "./model/User.js";
import Product from "./model/Product.js";
import Order from "./model/Order.js";
import dotenv from "dotenv"
dotenv.config();
import path from 'path';
const __dirname = path.resolve();


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

//-----signup------
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

app.post('/login', async (req,res)=>{
    const {email, password} = req.body;

    const findUser = await User.findOne({
        email:email,
        password:password
    }).select('name mobile address gender email')
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

    const ProductData = new Product({
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

//app.get('/product')

app.get('/all-in-one-product', async (req,res)=>{

    const findProduct = await Product.find();


    res.json({
        success:true,
        data:findProduct,
        message:"successfully fetch Product"
    })
})

//app.put('/product/:id)

app.put('/all-in-one-product/:_id',async (req,res)=>{
    const {_id} = req.params;

    const {name,discription,brand, price, image} = req.body;

    await Product.updateOne({_id:_id},{$set: {
            name:name,
            discription:discription,
            brand:brand,
            price:price,
            image:image
        }
    })
    const updateProduct = await Product.findOne({_id:_id})

    res.json({
        success:true,
        data:updateProduct,
        message:"Product update successfully"
    })
})

//app.get('/product/:id) ------- get product by id -------

app.get('/find-one-product/:_id', async (req,res)=>{
    const {_id} = req.params

    const findSpecificproduct = await Product.findOne({_id:_id})

    res.json({
        success:true,
        data:findSpecificproduct,
        message:"successfully fetch one product"
    })
    
})

//app.delete('/product/:id) ----delete the product by id

app.delete('/delete-the-product/:_id', async (req,res)=>{
    const {_id} = req.params;

    const deleteProduct = await Product.deleteOne({_id:_id})

    res.json({
       success:true,
       data:deleteProduct,
       message:`successfully delete this product ${_id}`
    })
})

//search the secific product

app.get('/product-search', async (req,res)=>{
    const {q} = req.query;

    const searchProduct = await Product.find({name: {$regex : q , $options : 'i'}});

    res.json({
        success:true,
        data:searchProduct,
        message:"search Product successfully"
    })
})

//app.post('/order')

app.post('/order', async (req,res)=>{
    const {user, product, quantity, shippingAddress, deliveryCharge, status} = req.body;

    const createorder = new Order({
        user:user,
        product:product,
        quantity:quantity,
        shippingAddress:shippingAddress,
        deliveryCharge:deliveryCharge,
        status:status
    })
 try{
    const savedOrder = await createorder.save();

    res.json({
        success:true,
        data:savedOrder,
        message:"order create successfully"
    })
 }
 catch(e){
 res.json({
    success:false,
    message:e.message
 })
 }
})

//app.get('/order') using popular

app.get('/getallorder',async (req,res)=>{
    
    const findOrder = await Order.find().populate('user product');

    findOrder.forEach((order)=>{
        order.user.password = undefined;
    })
    res.json({
        success:true,
        data:findOrder,
        message:"successfully fetch all order"
    })
})

//app.get('/order/user/:_id')

app.get('/order/user/:_id',async (req,res)=>{
    const {_id} = req.params;

    const fetchAllorder = await Order.find({user:_id}).populate('user product');

    fetchAllorder.forEach((order)=>{
        order.user.password = undefined;
    })

    res.json({
        success:true,
        data:fetchAllorder,
        message:"successfully fetch all order"
    })
    

})

//app.patch('/order/status/:_id')

app.patch('/order/status/:_id',async (req,res)=>{
    const {_id} = req.params;
    const {status} = req.body;

    const STATUS_PRIORITY_MAP = {
        pending:0,
        shipped: 1,
        delivered:2,
        returned:3,
        cancelled:4,
        rejected:5
    }
    const order = await Order.findById(_id);
    const currentStatus = order.status;
    const currentPriority = STATUS_PRIORITY_MAP[currentStatus]
    const newPriority = STATUS_PRIORITY_MAP[status];

    if(currentPriority > newPriority){
        return res.json({
            success:false,
            message:`${status} cannot be set once order is ${currentStatus}`
        });
    }

const updateStatus = await Order.updateOne({_id:_id}, {$set:{status:status}})



res.json({
    success:true,
  
    message:"successfully update status"
})

})


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });
}


app.listen(PORT, ()=>{
    console.log(`your server is running on ${PORT}`)
})


