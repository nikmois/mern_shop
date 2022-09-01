const Counter = require("../models/Counter");
const router = require("express").Router();

router.get("/", async (req,res)=>{
    try{
        let counter;
        counter = await Counter.find();
        
        res.status(200).json(counter);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router