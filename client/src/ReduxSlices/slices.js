import { createSlice } from "@reduxjs/toolkit";



const counterSlice = createSlice({
    name: "Counter",
    initialState: {
        counter: 100,
        isLoading: false,
        token: null,
        userType: null,
        refresh: false,
        role: null,
    },

    reducers: {
        addCount: (state, action) => {
            state.counter = action.payload
        },

        setToken: (state, action) => {
            state.token = action.payload
        },

        setRole: (state, action) => {
            state.role = action.payload
            console.log(state.role, "role")
        }
    }

})


const { actions, reducer } = counterSlice
const { addCount, setToken, setRole } = actions

const counterReducer = reducer

export {
    counterReducer, setToken, addCount, setRole
}
