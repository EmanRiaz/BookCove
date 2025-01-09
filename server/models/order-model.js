const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  book: [
    {
       type: mongoose.Schema.Types.ObjectId,
        ref: "books",
      },
      

  ],
  Status: {
    type: String,
    default: "Order Placed",
    enum: ["Order Placed", "Out for delivery", "cancelled"],
  },
  paymentType: {
    type: String,
    required: true,
    enum: ["cod", "card"],
  },
  paymentStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "completed", "cancelled"],
  },
  paymentId: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
}, { timestamps: true });
// define the model or the collection name
 const Order = new mongoose.model("Order", orderSchema);
module.exports=Order;