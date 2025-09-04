import FoodModel from "../Model/FoodSchema.js"
import OrderModel from "../Model/orderModel.js"
import RestaurantModel from "../Model/restaurantSchema.js"

export const create_restaurant = async (req, res) => {
    try {
        const body = req.body
        const userId = req.user.id
        const restaurantobj = {
            ...body,
            createBy: userId
        }
        const restaurantCreated = await RestaurantModel.create(restaurantobj)

        res.status(200).json({
            message: "Restaurant created successfully",
            status: true,
            data: restaurantCreated
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const get_all_restaurant = async (req, res) => {
    try {

        const getRestaurant = await RestaurantModel.find({})
        res.status(200).json({
            message: "Fetch all restaurants successfully",
            status: true,
            data: getRestaurant
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const all_restaurant = async (req, res) => {
    try {

        const getRestaurant = await RestaurantModel.find({ approvedStatus: "approved" })
        res.status(200).json({
            message: "Fetch all restaurants successfully",
            status: true,
            data: getRestaurant
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const delete_restaurant = async (req, res) => {
    try {
        const id = req.params.id
        const deleteResponse = await RestaurantModel.findByIdAndDelete({ _id: id })


        res.status(200).json({
            message: "Deleted successfully",
            status: true,
            data: deleteResponse
        })
    } catch (error) {

        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const edit_restaurant_contorller = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        const updateRestaurant = await RestaurantModel.findByIdAndUpdate(id, body, { new: true })
        res.status(200).json({
            message: "Update successfully",
            status: true,
            data: updateRestaurant
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}


export const restaurant_open_controller = async (req, res) => {
    try {

        const { id } = req.params
        const isOpen = req.body
        const restaurantStatus = await RestaurantModel.findByIdAndUpdate(id, isOpen, { new: true })
        res.status(200).json({
            message: "Update successfully",
            status: true,
            data: restaurantStatus
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const add_food_controller = async (req, res) => {
    try {
        const body = req.body
        const FoodItemCreated = await FoodModel.create(body)
        res.status(200).json({
            message: "created successfully",
            status: true,
            data: FoodItemCreated
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}
export const update_food_controller = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        const updated = await FoodModel.findByIdAndUpdate(id, body, { new: true })

        res.status(200).json({
            message: "updated successfully",
            status: true,
            data: updated
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}


export const fetch_food_controller = async (req, res) => {
    try {

        const getRestaurant = await FoodModel.find({})
        res.status(200).json({
            message: "Fetch all restaurants successfully",
            status: true,
            data: getRestaurant
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}


export const delete_food_controller = async (req, res) => {
    try {
        const { id } = req.params
        const deleteRes = await FoodModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Fetch all restaurants successfully",
            status: true,
            data: deleteRes
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

export const fetch_order = async (req, res) => {
    try {

        const data = await OrderModel.find({}).sort({ createdAt: -1 });
        res.status(201).json({
            message: "Fetch all orders successfully",
            status: true,
            data: data
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}



export const updata_status = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        const data = await OrderModel.findByIdAndUpdate(id, body, { new: true });

        req.app.get("io").emit("order_status_updated", data);

        res.status(201).json({
            message: "Fetch all orders successfully",
            status: true,
            data: data
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}