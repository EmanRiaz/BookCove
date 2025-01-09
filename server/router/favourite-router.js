const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { addBookToFavourite,removeBookFromFavourite ,getFavouritesBooks} = require("../controllers/favourite-controller");

router.put("/add-book-to-favourite", authMiddleware, addBookToFavourite);
router.put("/remove-book-from-favourite", authMiddleware, removeBookFromFavourite);
router.get("/get-favourite-books", authMiddleware, getFavouritesBooks);


module.exports = router;
