const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        title:{type:String , required:true, unique:true},
        desc:{type:String , required:true},
        longDesc:{type:String , required:true},
        img1:{type: String, required:true},
        img2:{type: String},
        img3:{type: String},
        img4:{type: String},
        img5:{type: String},
        img6:{type: String},
        category:{type:String},
        color:{type: Array},
        producer:{type: String},
        price:{type:Number, required: true},
        oldPrice:{type:Number},
        shipping:{type:Number, required: true},
        inStock:{type:Number, required: true},
        toHome:{type:Boolean, default: false},

},{timestamps: true });

module.exports = mongoose.model("Product",ProductSchema);