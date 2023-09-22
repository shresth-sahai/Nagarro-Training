require('dotenv').config();
const express=require('express');
const stripe=require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const ejs = require("ejs");
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render('index',{title:"Stripe Checkout"})
})

app.post("/create-checkout-session", async (req, res) => {
    console.log(req.body);
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: req.body.priceId,
            quantity: req.body.quantity,
          },
        ],
        success_url: "http://localhost:3000/success.html",
        cancel_url: "http://localhost:3000/cancel.html",
      });
      res.redirect(303, session.url);
    } catch (e) {
      throw new Error(e);
    }
  });
  
  app.post("/create-customer", async (req, res) => {
    try {
      const customer = await stripe.customers.create({
        name: req.body.name,
        email: req.body.email,
      });
      res.status(200).send(customer);
    } catch (e) {
      throw new Error(e);
    }
  });
  
  app.post("/add-card", async (req, res) => {
    const {
      customerId,
      cardName,
      cardExpYear,
      cardExpMonth,
      cardNumber,
      cardCVC,
    } = req.body;
    try {
      const cardToken = await stripe.tokens.create({
        card: {
          name: cardName,
          number: cardNumber,
          exp_month: cardExpMonth,
          exp_year: cardExpYear,
          cvc: cardCVC,
        },
      });
      const card = await stripe.customers.createSource(customerId, {
        source: `${cardToken.id}`,
      });
      return res.status(200).send({ card: card.id });
    } catch (error) {
      throw new Error(error);
    }
  });
  
  app.post("/create-charges", async (req, res) => {
    try {
      const createCharge = await stripe.charges.create({
        receiptEmail: req.body.email,
        amount: req.body.amount,
        currency: "inr",
        card: req.body.cardId,
        customer: req.body.customerId,
      });
      res.send(createCharge);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  app.post("/payment-intent", async (req, res) => {
    let paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: req.body.cardNumber,
        exp_month: req.body.cardExpMonth,
        exp_year: req.body.cardExpYear,
        cvc: req.body.cardCVC,
      },
    });
    let paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: req.body.amount,
      currency: "inr",
      confirm: true,
      payment_method_types: ["card"],
    });
    res.send(paymentIntent);
  });
  
app.listen(process.env.PORT,()=>{
    console.log("Server started in port "+process.env.PORT);
});