const User = require("../models/user-model");
const Book = require("../models/book-model");

const addBook = async (req, res) => {
    try {
      const { id } = req.headers;
      if (!id) {
        return res.status(400).json({ message: "Missing user ID in headers" });
      }
  
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }
  
      const book = new Book({
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      });
  
      await book.save();
      res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
      console.error("Error in addBook controller:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  

  const updateBook = async (req, res) => {
    try {
      const { bookid } = req.headers;
        if (!bookid) {
        return res.status(400).json({ message: "Book ID is required in headers" });
      }
  
      // Validate that the request body is not empty
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body cannot be empty" });
      }
  
      const updatedBook = await Book.findByIdAndUpdate(
        bookid,
        {
          url: req.body.url,
          title: req.body.title,
          author: req.body.author,
          price: req.body.price,
          desc: req.body.desc,
          language: req.body.language,
        },
        { new: true } 
        // returns the updated document
      );
  
      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      res.status(200).json({
        message: "Book updated successfully",
        updatedBook,
      });
    } catch (error) {
      console.error("Error updating book:", {
        bookid,
        requestBody: req.body,
        error: error.message,
      });
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


  const deleteBook = async (req, res) => {
    try {
      const { bookid } = req.headers;
        if (!bookid) {
        return res.status(400).json({ message: "Book ID is required" });
      }
  
      const deletedBook = await Book.findByIdAndDelete(bookid);
  
      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }
  
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
     

  const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find().sort({createdAt:-1});
      //Sorts the books in descending order (-1) based on the createdAt field.
      //  This means the most recently added books will appear first.
  
      // Check if no books are found
      if (!books || books.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }
  
      res.status(200).json({ message: "Books retrieved successfully", books });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  


//use to display on homepage
  const getRecentBooks = async (req, res) => {
    try {
      // Fetch the most recently added 4 books
      const recentBooks = await Book.find().sort({ createdAt: -1 }).limit(4);
  
     if (!recentBooks || recentBooks.length === 0) {
        return res.status(404).json({ message: "No books found" });
      }
  
      res.status(200).json({ message: "Recent books retrieved successfully", recentBooks });
    } catch (error) {
      console.error("Error fetching recent books:", error); // Log the error for debugging
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
// Get book by id to display
const getBookById = async (req, res) => {
  try {
    const { bookid } = req.params; 
    const book = await Book.findById(bookid); 
    
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    
    res.status(200).json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal server error" });
  }
};

  
  module.exports = { addBook, updateBook, deleteBook ,getAllBooks,getRecentBooks,getBookById};
/*req.headers: For metadata about the request, such as authentication tokens or content type.
req.params: For dynamic values embedded in the URL path. 
Both are essential for handling different 
aspects of HTTP requests effectively in a Node.js/Express application.*/