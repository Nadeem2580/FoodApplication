import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find(item => item._id === action.payload._id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        }, decreaseQuantity: (state, action) => {
            const existing = state.items.find(item => item._id === action.payload);
            if (existing) {
                if (existing.quantity > 1) {
                    existing.quantity -= 1;   // 🔹 bas decrease karo
                } else {
                    state.items = state.items.filter(item => item._id !== action.payload);  // 🔹 agar 0 ho gaya to remove
                }
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});
const { actions, reducer } = cartSlice
const { addToCart, removeFromCart, clearCart,decreaseQuantity } = actions;
const addCart = reducer
export {
    addCart, addToCart, clearCart, decreaseQuantity, removeFromCart
};
