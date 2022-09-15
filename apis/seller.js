import { Router } from "express";   
import { Seller } from '../models';
import {  validationResult } from 'express-validator';
import Validator from '../middlewares/validater-middleware'
import  { Buyers } from '../validators'
import { userAuth } from "../middlewares/auth";

const router = Router()

/**
 * @description Sellers create account
 * @accesss Public
 * @api api/seller
 * @type POST
 */

router.post('/seller', Validator, async(req, res) => {
    try{

        let { email, body} = req;

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                message: errors.array()

            })
        }

        let seller = new Seller({
            sellers:body
        })
        await seller.save();

        // Send the email to the user with a varification code
        /*
        let html = `
        <h1>Hello, ${seller.lastname, seller.lastname}</h1>
        <p>Thanks for connecting with Korgroup brokers, We will call you or Email you and have a meeting with you.</p>
    `;
        sendMain(sellers.email, "Thanks for connecting with Korgroup brokers", html);
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
 * @description  Get Sellers 
 * @accesss private
 * @api api/seller
 * @type GET
 */
router.get("/seller", userAuth, async(req, res) => {
    try{
        let seller = await Seller.find();
        return res.status(200).json({
            success: true,
            seller
        })
    }catch(err){
        console.log(err)
    }
})

export default router
