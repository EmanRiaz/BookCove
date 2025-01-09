const User = require("../models/user-model");
const Book = require("../models/book-model");
const Order = require("../models/order-model"); 

// Place order
const placeOrder = async (req, res) => {
    try {
        const { id } = req.headers;  // Assuming user ID is sent in headers
        const { order } = req.body;  // order is an array of order items

        for (const orderData of order) {
            const newOrder = new Order({
                user: id,
                book: orderData._id,
            });

            const orderDataFromDb = await newOrder.save();

            // Saving order in user model 
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });

            // Clearing cart 
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }

        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while placing the order",
        });
    }
};



// Get order history for a user
const getOrderHistory = async (req, res) => {
    try {
        const { id } = req.headers; // User ID should be in headers

        // Find the user by their ID and populate the orders array with order details
        const userData = await User.findById(id).populate({
            path: 'orders', // Orders are stored as references in the User model
            populate: {
                path: 'book' // Populate the book details for each order
            },
        });
      const ordersData=userData.orders.reverse();
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found",
            });
        }

        return res.json({
            status: "Success",
            message: "Order history fetched successfully",
            data: ordersData, // The populated orders array
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while fetching the order history",
        });
    }
};


// Get all orders for admin
const getAllOrders = async (req, res) => {
    try {
        // Fetch all orders and populate the associated user and book details
        const userData = await Order.find().populate({
            path: 'book',  // Populate the book details for each order
            model: 'Book'
        }).populate({
            path: 'user',  // Populate the user details for each order
        }).sort({createdAt:-1});

        return res.json({
            status: "Success",
            message: "All orders fetched successfully",
            data: userData, // The populated orders array
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while fetching the orders",
        });
    }
};
// Update order by admin
const updateStatus = async (req, res) => {
    try {
        const { id } = req.params; 

        // Find the order by its ID and update the necessary fields
        const updatedOrder= await Order.findByIdAndUpdate(
            id,
            {
                status:"Success",
            message:"Status updated successfully",  
           }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: "Error",
                message: "Order not found",
            });
        }

        return res.json({
            status: "Success",
            message: "Order updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "Error",
            message: "An error occurred while updating the order",
        });
    }
};
module.exports = { placeOrder ,getOrderHistory,getAllOrders,updateStatus};
