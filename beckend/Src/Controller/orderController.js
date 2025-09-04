import FoodModel from "../Model/FoodSchema.js"
import OrderModel from "../Model/orderModel.js"
import RestaurantModel from "../Model/restaurantSchema.js"


export const fetch_restaurant = async (req, res) => {
  try {

    const response = await RestaurantModel.find({ approvedStatus: "approved" }).limit(5)
    res.status(200).json({
      message: "Fetch all restaurant",
      status: true,
      data: response
    })

  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false
    })

  }
}

export const all_food_home_restaurant = async (req, res) => {
  try {
    const { id } = req.params
    const response = await FoodModel.find({ restaurantId: id }).populate("restaurantId");
    res.status(200).json({
      message: "Fetch all foods item",
      status: true,
      data: response
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false
    })
  }

}



export const all_food_restaurant = async (req, res) => {
  try {
    const { id } = req.params
    const { id: userId } = req.user
    const response = await FoodModel.find({ restaurantId: id }).populate("restaurantId");
    res.status(200).json({
      message: "Fetch all foods item",
      status: true,
      data: response,
      userId: userId
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false
    })
  }
}

export const confirm_order = async (req, res) => {
  try {
    const body = req.body;
    const userID = req.user.id;

    if (!body || body.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // ✅ Collect items
    const items = body.map((item) => ({
      foodId: item._id,
      name: item.name,
      price: Number(item.price),
      quantity: item.quantity,
    }));

    // ✅ Calculate total
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // ✅ RestaurantId (assuming all items from same restaurant)
    const restaurantId = body[0].restaurantId._id;

    // ✅ Final payload
    const payload = {
      customerId: userID,
      restaurantId,
      items,
      totalAmount,
      paymentMethod: "cash_on_delivery",
    };
    // ✅ Save in DB
    const order = await OrderModel.create(payload);

    res.status(201).json({
      message: "Order created successfully",
      status: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


export const fetch_order_user = async (req, res) => {
  try {
const userId = req.user.id
const orders = await OrderModel.find({customerId :userId})
    res.status(201).json({
      message: "Order fetched successfully",
      status: true,
      data :orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
}