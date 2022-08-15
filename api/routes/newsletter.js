const Newsletter = require("../models/Newsletter");
const { check, validationResult} = require('express-validator');

const router = require("express").Router();

router.post("/",[
    check('email', 'Palun sisestage olemasolev email').isEmail(),
], async (req,res) => {
    
    try{

        const errors = validationResult(req)
        const {email} = req.body

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Palun sisestage olemasolev email'
            })
        }

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