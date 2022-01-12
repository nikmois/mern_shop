const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        title:{type:String , required:true, unique:true},
        desc:{type:String , required:true},
        img1:{type: String, required:true},
        img2:{type: String},
        img3:{type: String},
        img4:{type: String},
        category:{type:String},
        color:{type: Array},
        producer:{type: String},
        price:{type:Number, required: true},
        discountPrice:{type:Number},
        inStock:{type:Boolean, default: true},

},{timestamps: true });

module.exports = mongoose.model("Product",ProductSchema);