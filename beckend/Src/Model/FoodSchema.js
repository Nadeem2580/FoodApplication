import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    name: { type: String },
    price: { type: String },
    description: { type: String },
    category: { type: String },
    imageUrl: { type: String, default: null },
    isavailable: { type: Boolean, default: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant", required: true },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    createBy: { type: String },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

const FoodModel = mongoose.model("food", Schema);

export default FoodModel;
