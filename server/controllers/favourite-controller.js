const User = require("../models/user-model");
const Book = require("../models/book-model");
const addBookToFavourite = async (req, res) => {
    try {
        const { bookid, id } = req.headers;

        console.log("Received headers:", { id, bookid });

        if (!id || !bookid) {
            console.warn("Missing parameters");
            return res.status(400).json({ message: "User ID and Book ID are required." });
        }

        console.log("Finding user with ID:", id);
        const userData = await User.findById(id);

        if (!userData) {
            console.warn("User not found");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("Checking if book is already in favourites");
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favourites" });
        }

        console.log("Adding book to favourites");
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { favourites: bookid } },
            { new: true }
        );

        console.log("Updated user:", updatedUser);
        return res.status(200).json({ message: "Book added to favourites", favourites: updatedUser.favourites });
    } catch (error) {
        console.error("Error in addBookToFavourite:", error.message, error.stack);
        res.status(500).json({ message: "Internal server error" });
    }
};


 const removeBookFromFavourite=async(req,res)=>{
    try {
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
        return res.status(200).json({message:"Book removed from favourites"});

    }catch(error){
        res.status(500).json({message:"internal server error"});
    }
 }
 

 //get favourites books of a particular user
 const getFavouritesBooks = async (req, res) => {
    try {
        const { id } = req.headers;
        console.log("Received user ID:", id);

        // Find user by ID and populate favourites
        const userData = await User.findById(id).populate("favourites");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const favouriteBooks = userData.favourites || [];
        return res.json({ status: "Success", data: favouriteBooks });
    } catch (error) {
        console.error("Error in getFavouritesBooks:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

module.exports = { addBookToFavourite,removeBookFromFavourite,getFavouritesBooks };


