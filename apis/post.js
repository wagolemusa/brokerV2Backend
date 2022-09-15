import { Router } from "express";   
import { Post } from '../models';
import { join } from 'path';
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'
import  { AdminValidation, AdminLogin } from '../validators'
import { userAuth } from "../middlewares/auth";
import { upload } from "../multer";
// import  uploadcloud  from "../middlewares/cloudinary";
import  uploader  from "../middlewares/uploader";
const cloudinary = require("../middlewares/cloudinary")
const path = require('path');
const fs = require('fs')
const router = Router()


/**
 * @description Create posts for shells
 * @api api/post/shell
 * @access Private
 * @Type POST
 */
 const cloudinaryImageUploadMethod = async file => {
    return new Promise(resolve => {
        cloudinary.uploader.upload( file , (err, res) => {
          if (err) return res.status(500).send("upload image error")
            console.log( res.secure_url )
            resolve({
              img: res.secure_url
            }) 
          }
        ) 
    })
  }
  
router.post('/post/shell', userAuth, upload.array('postPictures'),  async(req, res) => {
    try{
        const {email, title, country, city, price, description } = req.body;
      
        const postPictures = [];
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          const newPath = await cloudinaryImageUploadMethod(path)
          // console.log(newPath)
          postPictures.push(newPath)
        }
       
        const post = new Post({
            email,
            title,
            country,
            city,
            price,
            description,
            postPictures,
        })
        await post.save();
        /**
         *   fs.unlinkSync("path")
         */
        return res.status(201).json({
            success: true,
            message: "Post have been created"
        })
    }catch(err){
        console.log(err)
    }
})


/**
 * @description  Get Post shell data
 * @api api/post
 * @access public
 * @type GET
 */
router.get('/post', userAuth, async(req, res) => {
    try{
      let post = await Post.find()
      return res.status(200).json({
          success: true,
          post
      })

    }catch(err){
      console.log(err);
    }
})


/**
 * @description  Get Post data for only country 
 * @api api/country
 * @access public
 * @type GET
 */
 router.get('/country', async(req, res) => {
  try{
    let { page, size } = req.query
    if(!page){
      page =1
    }
    if(!size){
      size = 4
    }
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const post = await Post.find().limit(limit).skip(skip);
    return res.status(200).json({
      success: true,
      page, size, post
  })
  }catch(err){
    console.log(err);
  }
})


/**
 * @description  Get Post data id
 * @api api/post/id
 * @access public
 * @type GET
 */
 router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    return  res.status(200).json({
      success: true,
      post
    })
  } catch (err) {
    res.status(500).json(err);
  }
});


/**
 * @description Search Country and City
 * @api api/search
 * @access  public
 * @type  POST
 */
router.post('/search', async(req, res) => {
  try{
    let { country, city } = req.body;
    const post = await Post.find({country, city})
    if(!post){
      return res.status(400).json({
        success: false,
        message: "Country and city not found"
      })
    }
    return res.status(200).json({
      success: true,
      post
    })
  }catch(err){
    console.log(err)
    return res.status(400).json({
      success: false,
      message: "Unable to fetch data"

    })

  }
})


/**
 * @description  Get Post shell data limt by 3
 * @api api/post
 * @access Private
 * @type GET
 */
 router.get('/', async(req, res) => {
  try{
    let postdata = await Post.find().sort({_id: -1}).limit(3);
    if(!postdata){
      return res.status(400).json({
        success: false,
        message: "No data to display"
      })
    }
    return res.status(200).json({
        success: true,
        postdata
    })
  }catch(err){
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Unable to fetch data"
    })
  }
})



/**
 * @description upudate post shell
 * @api api/update
 * @access Private
 * @type PUT
 */
router.put('/update', userAuth, async(req, res) => {
  try{
    let post = await Post.findOneAndUpdate({
      title: req.body.title,
      country: req.body.country,
      city: req.body.city,
      price: req.body.price,
      description: req.body.description
    })
    return res.status(200).json({
      success: true,
      post
    })
  }catch(err){
    console.log(err)
    return res.status(400).json({
      success: false,
      message: "Unable to update post"
    })

  }
})

export default router