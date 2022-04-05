const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        fullname:{type:String , required:true},
        email:{type: String, required: true, index:true, unique:true,sparse:true},
        password:{type:String , required:true},
        phone:{type:String , required:true},
        address:{type:String},
        orders: [{ type: mongoose.Types.ObjectId, ref: 'Order'}],
        isAdmin:{
            type:Boolean,
            default: false
        },
        img: {type: String, default: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"},
},{timestamps: true });

module.exports = mongoose.model("User",UserSchema);