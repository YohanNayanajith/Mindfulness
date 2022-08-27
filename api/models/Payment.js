const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    clientSecret: { type: String },
    createdDate: { type: Date },
    currency: { type: String },
    shipping: { type: String, default: "none" },
    status: { type: Boolean, default: true },
    UserID: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);