const router = require("express").Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51LQvEKAjPRkUStMY1WBEiw2U9uw2y5PbqpK7sdHFAVYcARCw0yPhQLL0YP7XfDAtGUVhzaBADOUb9LzgDLsAOSY400SfkLjvaG');
const Payment = require('../models/Payment');

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, //lowest denomination of particular currency
      currency: req.body.currency,
      payment_method_types: ["card"], //by default
    });

    
    const clientSecret = paymentIntent.client_secret;
    // console.log(clientSecret);

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

router.post("/payment", (req, res) => {
  // console.log(stripe);
  // stripe.charges.create(
  //   {
  //     source: req.body.tokenId,
  //     amount: req.body.amount,
  //     currency: "usd",
  //     apiKey: "sk_test_51LQvEKAjPRkUStMY1WBEiw2U9uw2y5PbqpK7sdHFAVYcARCw0yPhQLL0YP7XfDAtGUVhzaBADOUb9LzgDLsAOSY400SfkLjvaG"
  //     // description: 'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
  //   },
  //   (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //       res.status(500).json(stripeErr);
  //     } else {
  //       res.status(200).json(stripeRes);
  //     }
  //   }
  // );
  stripe.charges.create({
    amount: 2000,
    currency: "usd",
    source: req.body.tokenId, // obtained with Stripe.js
    description: "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)"
  }, {
    idempotencyKey: "UTB0EKLLnQjxVQhI"
  }, function(err, charge) {
    console.log(err);
    console.log(charge);
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(charge);
    }
  });
});

//create new payment
router.post("/", async (req, res) => {
  const payment = new Payment(req.body);

  try {
    const savedPost = await payment.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    // const Category = await Category.findById(req.params.id);
    const payment = await Payment.findById(req.params.id);
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const payments = query
      ? await Payment.find().sort({ _id: -1 }).limit(5)
      : await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
