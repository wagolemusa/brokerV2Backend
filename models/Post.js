import { Schema, model } from 'mongoose'

const PostSchema =  new Schema({

    email:{
        type:String,
        require: true,
    },
 
    title:{
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postPictures: [
        {img: {type: String }}
    ],
        
}, { timestamps: true });

const Post = model("posts", PostSchema)
export default Post;




