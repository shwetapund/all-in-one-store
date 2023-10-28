import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required:true
        
    },
    address:{
        type: String
    },
    gender:String
},
{
    timestamps:true
}
)

const User = model('User',UserSchema);

export default User 