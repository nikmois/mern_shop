const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    counter: {type:Number},
},{timestamps: true });

module.exports = mongoose.model("Counter",CounterSchema);