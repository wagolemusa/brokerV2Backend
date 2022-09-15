import { Schema, model } from "mongoose";
import { compare, hash } from 'bcryptjs'
import  { sign } from 'jsonwebtoken';
import  { SECRECT  } from '../constants'
import {  pick } from 'lodash'

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    }
    
},{ timestamps: true});

UserSchema.pre("save", async function (next){
    let user = this;
    if(!user.isModified("password")) return next();
    user.password = await hash(user.password, 10);
})

UserSchema.methods.comparePassword = async function(password){
    return await compare(password, this.password);
}

UserSchema.methods.generateJWT = async function(){
    let payload = {
        username: this.username,
        email: this.email,
        id: this.id
    }
    return await sign(payload, SECRECT, {expiresIn: '1 day'});
}

UserSchema.methods.getAdimInfo = function () {
    return pick(this, ["_id", "username", "email"])
}

const User = model("users", UserSchema);
export default User;
