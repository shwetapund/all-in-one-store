import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    discription:{
        type:String,
    },
    brand:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const Product = model('Product',ProductSchema);

export default Product