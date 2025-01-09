const User = require("../models/user-model");
const Book = require("../models/book-model");
//put book to cart
const addToCart = async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        // Ensure `bookid` and `id` are provided
        if (!bookid || !id) {
            return res.status(400).json({
                status: "fail",
                message: "Book ID and User ID are required",
            });
        }
        const userData = await User.findById(id);

        // Check if the user exists
        if (!userData) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        // Check if the book is already in the cart
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.json({
                status: "success",
                message: "Book is already in the cart",
            });
        }

        // Add the book to the user's cart
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid },
        });

        return res.json({
            status: "success",
            message: "Book added to cart",
        });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Remove a book from the cart
const removeFromCart = async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        if (!bookid || !id) {
            return res.status(400).json({
                status: "fail",
                message: "Book ID and User ID are required",
            });
        }
        const userData = await User.findById(id);

        if (!userData) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        // Check if the book is in the cart
        const isBookInCart = userData.cart.includes(bookid);
        if (!isBookInCart) {
            return res.json({
                status: "success",
                message: "Book is not in the cart",
            });
        }

        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid },
        });

        return res.json({
            status: "success",
            message: "Book removed from cart",
        });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get the cart of a particular user
const getUserCart = async (req, res) => {
    try {
        const { id } = req.headers;

        // Ensure the user ID is provided
        if (!id) {
            return res.status(400).json({
                status: "fail",
                message: "User ID is required",
            });
        }

        // Find the user by their ID and populate the 'cart' field (assuming it contains references to books)
        const userData = await User.findById(id).populate("cart"); 
       /* The populate method in Mongoose is used to replace the references in a field with the actual data
        from the referenced documents. It's particularly useful when working with MongoDB's ObjectId references
         between collections.*/

        // Check if the user exists
        if (!userData) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        // Reverse the cart to display the latest added items first
        const cart = userData.cart.reverse();

        // Return the user's cart
        return res.json({
            status: "success",
            data: cart,
        });

    } catch (error) {
        console.error("Error in getUserCart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addToCart ,removeFromCart,getUserCart};
