import { configureStore } from "@reduxjs/toolkit"
import {counterReducer} from "../ReduxSlices/slices"

const store = configureStore({
    reducer: {
        Counter : counterReducer,
        
    }
})


export default store