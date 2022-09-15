import { check } from 'express-validator';

const  username = check("username", "Username is required.").not().isEmpty();
const firstname = check("firstname", "Firstname is required.").not().isEmpty();
const lastname = check("lastname", "Lastname is required.").not().isEmpty();
const phone = check("phone", "Mobile number should contains 9 t0 13 digits").isLength({ min: 9, max: 13 });
const country = check("country", "Country is required").not().isEmpty();
const city = check("city", "City is required.").not().isEmpty();
const email = check("email", "Please provide a valid email address").isEmail();

const password =  check('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 chars long')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)
    .withMessage('Password must 8 to 15 contain a number, uppercase, lowercase and special character')

    
export const AdminValidation = [username, email, password];
export const Buyers = [firstname, lastname, phone, country, city, email];

export const AdminLogin = [email, password];


