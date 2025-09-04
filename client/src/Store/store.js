import { configureStore } from "@reduxjs/toolkit"
import { addCart } from "../ReduxSlices/AddToCart"
import { adminReducer } from "../ReduxSlices/adminSlices"
import { counterReducer } from "../ReduxSlices/slices"

const store = configureStore({
    reducer: {
        Counter: counterReducer,
        Admin: adminReducer,
        cart: addCart,
    }
})


export default store