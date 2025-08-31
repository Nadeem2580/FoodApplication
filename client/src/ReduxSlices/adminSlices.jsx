import { createSlice } from "@reduxjs/toolkit";


const adminSlices = createSlice({
    name: "Admin",
    initialState: {
        isRefresh: false,
        users: [],
        restaurant: [],
        vendor: [],
    },

    reducers: {
        setIsRefresh: (state, action) => {
            state.isRefresh = action.payload
            console.log(state.isRefresh, "refresh")
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setRestaurant: (state, action) => {
            state.restaurant = action.payload
        },
        setVendor: (state, action) => {
            state.vendor = action.payload
        },


    }
})


const { actions, reducer } = adminSlices

const { setIsRefresh, setUsers, setRestaurant, setVendor } = actions

const adminReducer = reducer

export { adminReducer, setIsRefresh, setUsers, setRestaurant, setVendor }