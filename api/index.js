const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const counterRoute = require("./routes/counter");
const newsletterRoute = require("./routes/newsletter");
const orderRoute = require("./routes/order");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const pdf = require("html-pdf");

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

let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});


        
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/counter", counterRoute);
app.use("/api/newsletter",newsletterRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.listen(process.env.PORT || 5000, ()=> {
    console.log("Backend server is running!")
});

async function htmlToPdfBuffer(pathname, params) {
    const html = await ejs.renderFile(pathname, params);
    return new Promise((resolve, reject) => {
        pdf.create(html).toBuffer((err, buffer) => {
        if (err) {
            reject(err);
        } else {
            resolve(buffer);
            console.log("resolved")
        }
        });
    });
}
app.post('/contact', async (req,res) => {
    const {email, name, lastname, products, id, total, post, shipping, arveId, city, street} = req.body;
    const zeroLength = 7;
    let arveID = arveId.toString().padStart(zeroLength, '0');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '.' + mm + '.' + yyyy;

    const fileBuffer = await htmlToPdfBuffer("template.ejs", {
        products: products,
        arveId: arveID,
        name: name,
        lastname: lastname,
        total: total,
        today: today,
        city: city,
        street: street
    });


    var tbody = products.reduce(function(a, b) {
        return a + '<tr style="border-bottom: 1px solid #ffe5b4;"><td style="text-align: center;">' + b.title + '</td><td style="text-align: center;">' + b.quantity + '</td><td style="text-align: center;">' + b.price + ' €' + '</td></tr>';
      }, '');

    let mailOptions = {
        from: 'babypingviin@outlook.com',
        to: email,
        subject: `Tellimuse nr ${id} kinnitamine`,
        html: `<div style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 14px;">
        <div style="
        text-align: center;
        background-color: red;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        font-size: 20px;
        color: white;">
        Tähelepanu, veebileht on testrežiimis, teie tellimust ei töödelda
        </div>
        <h2 style="
        color: blue;
        padding: 1rem 0;">
        Baby Pingviin</h2>
        <p>Tere,</p>
        <p>Lugupeetud ${name} ${lastname}</p>
        <p>Saime Teie tellimuse!</p>
        <div>Palun kontrollige tellimus ja sooritage pangamakse kolme päeva jooksul</div>
        <div>
        <table style="
        border: 1px solid #ffe5b4;
        font-size: 12px;
        width: 100%;">
        <thead><tr><th>Toode nimi</th><th>Kogus</th><th>Hind</th></tr></thead><tbody>` + tbody +
        `</div>
        <div style="
        text-align: right;
        color: #ffe5b4;
        font-size: 16px;
        padding-top: 1rem; 
        ">
        Kokku ${total} €
        </div>
        <div>Saate kauba kätte 3 - 5 tööpäeva jooksul peale maksmist Teie poolt märgitud pakiautomaadi</div>
        <div>Teie poolt valitud pakiautomaat: ${shipping} ${post}</div>
        <div>Manuses leiate arve pdf failina</div>
        <div style="padding-top: 3rem;">Lugupidamisega,</div>
        <div>Baby Pingviin e-pood</div>
        </div>`,
        attachments: [
            {
                filename: `arve_${arveID}.pdf`,
                contentType: 'application/pdf',
                content: fileBuffer
            }
        ]
    };
    await transporter.sendMail(mailOptions, function(err, data){
        if (err) {
            console.log(err)
        } else {
            console.log("working")
        }
    })
});