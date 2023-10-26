import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number,
    address:String,
    gender:String
})

const User = model('User',UserSchema);

export default User 