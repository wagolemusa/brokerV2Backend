import { Schema, model } from "mongoose";

const SellerSchema = new Schema({
    
    sellers :{
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        phone: {
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
        email: {
            type: String,
            required: true,
        }
    }
    
},{ timestamps: true});

const Seller = model("sellers", SellerSchema);
export default Seller;




