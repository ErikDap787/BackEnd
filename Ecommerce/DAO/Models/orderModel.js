import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  shippingAddress: String,
  paymentMethod: String,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
