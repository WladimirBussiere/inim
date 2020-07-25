require('dotenv').config();
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    mini_number: {
      type: Number,
      required: true
    },
    order_price: {
      type: Number,
      required: true
    },
    family_pack: {
      type: Boolean,
      default: false,
      required: true
    },
    mini_price: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    production_status: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      default: 'untreated'
    },
    serial_numbers: [
      {
        type: String,
        default: null
        // unique: true
      }
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User' } //ref to user schema
  }
//   user_email: {
//     type: mongoose.Schema.Types.ObjectId, ref: 'User' } //ref to user schema
// }
);


module.exports = mongoose.model("Order", orderSchema);
