const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
}, { timestamps: true }); 

// Define the model or the collection name
const Book = mongoose.model("books", bookSchema);

module.exports = Book;
