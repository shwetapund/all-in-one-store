import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    shippingAddress : {
        type: String,
        required:true
    },
    quantity:{
        type:Number,
        default:1,
        required:true
    },
    deliveryCharge:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:"pending"
    }
},
{
    timestamps:true
})
//model
const Order = model('Order',orderSchema);

export default Order