import { createSlice } from "@reduxjs/toolkit";



const counterSlice = createSlice({
    name: "Counter",
    initialState: {
        counter: 100,
        isLoading: false,
        token: null,
        userType: null,
        isRefresh: false,
        role: null,
        restaurant: [],
        addFood: false,
        editFood: false,
        selectedRestaurant: {},
        selectedFood: {},
        createResModal: false
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
        },

        setIsRefresh: (state, action) => {
            state.isRefresh = action.payload
        },
        setRestaurant: (state, action) => {
            state.restaurant = action.payload
        },
        setAddFood: (state, action) => {
            state.addFood = action.payload
            console.log(state.addFood)
        },
        setSelectedRestaurant: (state, action) => {
            state.selectedRestaurant = action.payload
            console.log(state.selectedRestaurant, "selectedRestaurant")
        },
        setSelectedFood: (state, action) => {
            state.selectedFood = action.payload
            console.log(state.selectedFood, "selectedRestaurant")
        },
        setCreateResModal: (state, action) => {
            state.createResModal = action.payload
            console.log(state.createResModal, "createResModal")

        },
        setEditFood: (state, action) => {
            state.editFood = action.payload
            console.log(state.editFood , "setEditFood")
        }
    }

})


const { actions, reducer } = counterSlice
const { setEditFood, addCount, setToken, setRole, setIsRefresh, setRestaurant, setAddFood, setSelectedRestaurant, setCreateResModal, setSelectedFood } = actions

const counterReducer = reducer

export { addCount, counterReducer, setAddFood, setCreateResModal, setEditFood, setIsRefresh, setRestaurant, setRole, setSelectedFood, setSelectedRestaurant, setToken };
