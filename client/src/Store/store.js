import { configureStore } from "@reduxjs/toolkit"
import { counterReducer } from "../ReduxSlices/slices"
import { adminReducer } from "../ReduxSlices/adminSlices"
import { addCart } from "../ReduxSlices/AddToCart"

const store = configureStore({
    reducer: {
        Counter: counterReducer,
        Admin: adminReducer,
        cart: addCart,
    }
})


export default store