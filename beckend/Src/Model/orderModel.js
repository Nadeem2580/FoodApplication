import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true }, // Food reference
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, // User reference
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant", required: true }, // Restaurant reference
    items: [itemSchema],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String },
    status: {
        type: String,
        enum: ["pending", "accepted", "preparing", "on_the_way", "delivered", "rejected"],
        default: "pending"
    },
    createdAt: { type: Date, default: Date.now },
});



const OrderModel = mongoose.model("orders", orderSchema);

export default OrderModel;
