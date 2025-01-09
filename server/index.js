 // Import required modules
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config(); 
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const bookRouter = require("./router/book-router");
const favouriteRouter = require("./router/favourite-router");
const cartRouter = require("./router/cart-router");
const orderRouter = require("./router/order-router");


const router = express.Router(); // Initialize router
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
//Tackle CORS
const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());


// Mount routers for different routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/books", bookRouter); 
app.use("/api/favourite", favouriteRouter); 
app.use("/api/cart", cartRouter); 
app.use("/api/order", orderRouter); 



app.use(errorMiddleware);//always in last middleware



// Server setup
PORT=5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
});
