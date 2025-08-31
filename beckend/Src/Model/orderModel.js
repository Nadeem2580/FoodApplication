// models/Order.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    foodId: String,
    name: String,
    qty: Number,
    price: Number
});

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: [itemSchema],
    totalAmount: Number,
    status: { type: String, default: "pending" }, // pending, accepted, preparing, delivered, rejected
    createdAt: { type: Date, default: Date.now }
});

const ordersSchema = mongoose.model("Order", orderSchema);


export default ordersSchema 