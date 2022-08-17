const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const newsletterRoute = require("./routes/newsletter");
const orderRoute = require("./routes/order");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

dotenv.config();
mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connection successfull!"))
.catch((err)=> {
    console.log(err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/send-mail", cors(), async (req,res) => {
    let {data} = req.body
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    try{
    await transport.sendMail({
        from: process.env.MAIL_FROM,
        to: "nik.moissejev@gmail.com",
        subject: `Tellimuse nr 234 kinnitamine`,
        html: `<div style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px;">
        <h2 style="
        color: blue;
        padding: 1rem 0;">
        Baby Pingviin</h2>
        <p>Saime Teie tellimuse</p>
        <div>Palun kontrollige oma tellimuse ja sooritage makse kolme päeva jooksul</div>
        <div>
        TELLIMUS
        </div>
        <div style="padding-top: 3rem;">Lugupidamisega</div>
        <div>Baby Pingviin e-pood</div>
        </div>`
    })
    res.json('Email Sent');
    } catch(e){
        res.status(500).json(e);
    }
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/newsletter",newsletterRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.listen(process.env.PORT || 5000, ()=> {
    console.log("Backend server is running!")
});