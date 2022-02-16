const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { check, validationResult} = require('express-validator');

//REGISTER
router.post(
    "/register", 
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password minimal length is 8 symbols')
        .isLength({min:8})
    ],
    async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data for registration, please try again'
            })
        }

        const candidate = await newUser.findOne({email})
        if (candidate) {
            return res.status(400).json({ message: "User with this e-mail already exists!"})
        }
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

//LOGIN

router.post(
    "/login", 
    [
        check('email', 'Enter existing email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req,res)=>{
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data for registration, please try again'
            })
        }

        const user = await User.findOne({email: req.body.email});
        !user && res.status(401).json("Wrong credentials!")

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !==req.body.password &&
         res.status(401).json("Wrong password or email, please try again")

        const accessToken = jwt.sign({
            id:user._id, 
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SEC,
        {expiresIn: "3h"}
        );

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken});
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router