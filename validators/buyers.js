import { check } from "express-validator";

const firstname = check("firstname", "Firstname is required.").not().isEmpty();
const lastname = check("lastname", "Lastname is required.").not().isEmpty();
const phone = check("phone", "Mobile number should contains 9 t0 13 digits").isLength({ min: 9, max: 13 });
const country = check("country", "Country is required").not().isEmpty();
const city = check("city", "City is required.").not().isEmpty();
const email = check("email", "Please provide a valid email address").isEmail();


export const Buyers = [firstname, lastname, phone, country, city, email ]