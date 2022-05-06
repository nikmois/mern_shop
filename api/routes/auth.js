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
        check('password', 'Password minimal length is 6 symbols')
        .isLength({min:6})
    ],
    async (req,res)=>{

    try{
        const errors = validationResult(req)

        const regularExpression = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;

        const {email, firstName, lastName, password, phone, pass} = req.body

        if (!email || !firstName || !lastName || !password || !phone || !pass){
            return res.status(400).json({ message: "Please fill all required fields!"})
        }

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Password minimal length is 6 symbols'
            })
        }

        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({ message: "User with this e-mail already exists!"})
        }

        if (!phone) {
            return res.status(400).json({ message: "Please enter your phone number!"})
        }

        if (pass != password) {
            return res.status(400).json({ message: "Please confirm your password!"})
        }

        if (regularExpression.test(password) == false){
            return res.status(400).json({ message: "Password should contain at least one character and one number and be minimum 6 symbols long!"})
        }

        if (!firstName) {
            return res.status(400).json({ message: "Please enter your first name!"})
        }

        if (!lastName) {
            return res.status(400).json({ message: "Please enter your first name!"})
        }

        const hashedPassword = CryptoJS.AES.encrypt(password,process.env.PASS_SEC).toString()

        const user = new User({ email, firstName, lastName, phone, password: hashedPassword })

        await user.save();
        res.status(201).json({ message: "User created successfully!"});
    }catch(e){
        res.status(500).json({ message: "Server error!"});
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
                message: 'Wrong email or password, please try again'
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