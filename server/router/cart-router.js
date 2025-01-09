const express = require("express");
const router = express.Router();
const { addToCart,removeFromCart,getUserCart} = require("../controllers/cart-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/add-to-cart", authMiddleware, addToCart);
//want to remove from a particular schema only not from actual database that's why "PUT"
router.put("/remove-from-cart", authMiddleware, removeFromCart);
router.get("/get-user-cart", authMiddleware, getUserCart);

module.exports = router;
