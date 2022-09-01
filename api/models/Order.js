const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
        userId:{type:String },
        products: [
            {
                productId:{
                    type: String
                },
                title:{
                    type: String
                },
                quantity:{
                    type: Number,
                    default: 1,
                },
                color:{
                    type: String
                },
                price:{
                    type: String
                }
            }
        ],
        amount: {type:Number, required: true},
        firstName: {type:String, required: true},
        lastName: {type:String, required: true},
        email: {type:String, required: true},
        phone: {type:String, required: true},
        country: {type:String, required: true},
        city: {type:String},
        postcode: {type:String},
        shipping: {type:String},
        shippingSize: {type:String},
        shippingPrice: {type:Number},
        container: {type:String, required: true},
        message: {type:String},
        street:{type:String},
        status: {type:String, default: "töötlemisel" },
},{timestamps: true });

module.exports = mongoose.model("Order",OrderSchema);