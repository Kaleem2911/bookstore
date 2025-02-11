const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: "books",
  },
  status: {
    type: String,
    default: "Order Placed",
    enum: ["Order Placed", "Out for delivery , Delivered,Canceled"],
  },
  date: {
    type: Date, 
    default: Date.now,
  },
  updatedDate: {
    type: Date, 
  },

});

module.exports = mongoose.model("order", orderSchema);
