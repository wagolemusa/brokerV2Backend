import { Router } from "express";   
import { Buyer } from '../models';
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'
import  { AdminValidation } from '../validators'
import  { Buyers } from '../validators'
import { userAuth } from "../middlewares/auth";

const router = Router()

/**
 * @description buyers create account
 * @accesss Public
 * @api api/buyer
 * @type POST
 */

router.post('/buyer', Validator, async(req, res) => {
    try{

        let { email, body } = req;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()
            })
        }

    
        let buyer = new Buyer({
           buyers:body
        })

        console.log(req.body, buyer)

        await buyer.save();

        // Send the email to the user with a varification code
        /*
        let html = `
        <h1>Hello, ${buyer.lastname, buyer.lastname}</h1>
        <p>Thanks for connecting with Korgroup brokers, We will call you or Email you and have a meeting with you.</p>
    `;
        sendMain(buyer.email, "Thanks for connecting with Korgroup brokers", html);
        */
        return res.status(201).json({
            success: true,
            message: "Thanks for connecting with Korgroup brokers."
        })
    }catch(error){
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Samething went wrong"
        })
    }
})


/**
 * @description  Get buyers api
 * @api /buyer
 * @Paccess Private
 * @type GET  
 */
router.get("/buyer", userAuth, async(req, res) => {
    try{
        let buy = await Buyer.find()
        
        return  res.status(200).json({
            success: true,
            buy,
        })

    }catch(err){
        console.log(err)
        return res.status(400).json({
            success: false,
            messsage: "Unable to get the profile"
        })
    }


} )

export default router
