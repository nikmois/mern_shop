const Newsletter = require("../models/Newsletter");

const router = require("express").Router();

router.post("/", async (req,res) => {
    
    try{

        const {email} = req.body

        if (!email){
            return res.status(400).json({ message: "Palun sisestage oma email!"})
        }

        const candidate = await Newsletter.findOne({email})
        if (candidate) {
            return res.status(400).json({ message: "Sisestatud email on juba liitunud meie uudiskirjaga"})
        }

        const newEmail = new Newsletter(req.body)
        await newEmail.save();
        res.status(201).json({ message: "Täname liitumise eest. Nüüd on teil võimalik eripakkumisi saada!"});
    }catch(e){
        res.status(500).json({ message: "Midagi läks valesti. Palun proovige hiljem uuesti!"});
    }
});

module.exports = router