import { configureStore } from "@reduxjs/toolkit"
import { counterReducer } from "../ReduxSlices/slices"
import { adminReducer } from "../ReduxSlices/adminSlices"

const store = configureStore({
    reducer: {
        Counter: counterReducer,
        Admin: adminReducer,

    }
})


export default store