const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    price: { type: Number },
    isPay: { type: Boolean, default: false },
    isCancel: { type: Boolean, default: false },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
