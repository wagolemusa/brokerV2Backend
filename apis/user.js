import { Router } from "express";   
import { User } from '../models';
import { join } from 'path';
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'
import  { AdminValidation, AdminLogin } from '../validators'
const router = Router()


/**
 * @description Admin Create account
 * @accesss Public
 * @api /admin/api/create
 * @type POST
 */
router.post('/api/create', AdminValidation, Validator, async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({
                success: false,
                message: "Email is already registered."
            })
        }

        user = new User({
            ...req.body
        })
        await user.save();
        return res.status(201).json({
            success: true,
            message: "Your account is now create."
        })


    }catch(error){
        console.log(error);
    }
} )


/**
 * @description Adimn Login 
 * @access Private
 * @api /admin/api/login
 * @type POST
 */
router.post('/api/login', AdminLogin, Validator, async(req, res)=> {
    try{    
        let { email, password} = req.body;
        let user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Email not found"
            })
        }
        if(!(await user.comparePassword(password))){
            return res.status(401).json({
                success: false,
                message: "Incorrent password."
            })
        }
        let token  = await user.generateJWT();
        return res.status(201).json({
            success: true,
            user: user.getAdimInfo(),
            token: `Bearer ${token}`,
            message: 'Your are now login'
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            succuss: false,
            message: 'An error occured.'
        })
    }
})

export default router;