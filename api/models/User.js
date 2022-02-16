const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        fullname:{type:String , required:true},
        email:{type:String , required:true, unique:true},
        password:{type:String , required:true},
        orders: [{ type: mongoose.Types.ObjectId, ref: 'Order'}],
        isAdmin:{
            type:Boolean,
            default: false
        },
        img: {type: String},
},{timestamps: true });

module.exports = mongoose.model("User",UserSchema);