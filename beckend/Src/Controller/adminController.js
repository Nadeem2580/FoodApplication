import FoodModel from "../Model/FoodSchema.js"
import RestaurantModel from "../Model/restaurantSchema.js"
import userModel from "../Model/schema.js"


export const get_all_restaurants = async (req, res) => {
    try {

        const fetchRestaurant = await RestaurantModel.find({})
        res.status(200).json({
            message: "Fetch all restaurants successfully",
            status: true,
            data: fetchRestaurant
        })

    } catch (error) {
        console.log(error, "error")
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const get_all_food = async (req, res) => {
    try {

        const fetchFood = await FoodModel.find({})
        res.status(200).json({
            message: "Fetch all foods item successfully",
            status: true,
            data: fetchFood
        })

    } catch (error) {
        console.log(error, "error")
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}


export const get_all_users = async (req, res) => {
    try {

        const fetchUser = await userModel.find({})
        res.status(200).json({
            message: "Fetch all users successfully",
            status: true,
            data: fetchUser
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const get_update_user_vendor = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body

        const response = await userModel.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json({
            message: `User isVerified updated successfully`,
            status: true,
            data: response
        })

    } catch (error) {
        console.log(error, "error")
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const get_update_restaurant = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body

        const response = await RestaurantModel.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json({
            message: `User Restaurant updated successfully`,
            status: true,
            data: response
        })




    } catch (error) {
        console.log(error, "error")
        res.status(500).json({
            message: error.message,
            status: false
        })

    }
}