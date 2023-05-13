const express = require("express")
helmet = require("helmet")
cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const upload = require("express-fileupload")


require("dotenv").config()
var stripe = require('stripe')(process.env.STRIPE_KEY);

mongoose.connect(process.env.MONGO_DB_URI , {useNewUrlParser: true , useUnifiedTopology: true})
.then(()=>console.log("Connected to DB"))
.catch((err)=>console.log(err))



const userRoutes = require("./routes/userRoutes")
const itemRoutes = require("./routes/itemRoutes")
const orderRoutes = require("./routes/orderRoutes")
const { verifyTokenExiry } = require("./utils/Authenticate")
const { calculateTotal } = require("./utils/utils")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(upload())
app.use('/static',express.static("uploads"))

app.use(helmet())
app.use(cors({
    origin: "*"
}))

app.use("/api/user" , userRoutes)
app.use("/api/item" , itemRoutes)
app.use("/api/order" , orderRoutes)
app.get("/config" , (req , res)=>{
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
}
)

app.post("/create-payment-intent" , async(req , res)=>{
    const {Cartt} = req.body
   try{
    let total = 0;
    total = await calculateTotal(Cartt);
    console.log("total",total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd',
        metadata: {integration_check: 'accept_a_payment'},
        automatic_payment_methods: {
            enabled: true,
            },
      });
      res.send({"Success": true ,
        clientSecret: paymentIntent.client_secret
      });
   }catch(err){
         console.log(err)
         res.status(400).json({ "Success": false, 'Message': 'adding new order failed' , err });
    }
})

app.get("/api" , (req , res)=>{
    res.send("Hello World")
});

app.listen(3000 , ()=>{
    console.log("App lisyemomng on port 3000");
})


app.get("/verify" , verifyTokenExiry)
    
