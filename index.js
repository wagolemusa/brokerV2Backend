import express from "express";
import dotenv  from "dotenv";
import { join } from "path";
import mongoose from "mongoose";
import passport from "passport";
import { json } from "body-parser";
import cors from 'cors'
const path = require("path")

import { DB } from './constants/index'

import UserApis from './apis/user';
import BuyerApis from './apis/buyer';
import SellerApis from './apis/seller';
import PostApis from './apis/post';


// import { api } from "./middlewares/cloudinary";

// import passport middleware
require("./middlewares/passport-middleware")


const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/admin", UserApis);
app.use("/api", BuyerApis);
app.use("/api", SellerApis);
app.use("/api", PostApis);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "uploads")))
app.use(express.json({limit: "50mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true}))


let port = process.env.PORT || 5000;

const main = async () => {
    try {
        // Connect with the database 
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });
        console.log("DATABASE CONNECTED...");
        // Start application listening  for request on server

    
    app.listen(port, () => console.log(`Server started on port ${port}`));
    }catch(error){
        console.log(`Unbale to start the server \n${error.message}`)
    }
}

main();
