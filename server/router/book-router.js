const express = require("express");
const router = express.Router();
const { addBook,updateBook ,deleteBook,getAllBooks,getRecentBooks,getBookById} = require("../controllers/book-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/add-book", authMiddleware, addBook);
router.put("/update-book/:id", authMiddleware, updateBook); 
router.delete("/delete-book/:id", authMiddleware, deleteBook);
router.get("/all-books", getAllBooks);
router.get("/recent-books", getRecentBooks);
router.get("/:bookid", getBookById);




module.exports = router;
