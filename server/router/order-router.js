const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const { placeOrder,getOrderHistory,getAllOrders,updateStatus} = require("../controllers/order-controller");
router.post("/place-order", authMiddleware,placeOrder);
router.post("/get-order-history", authMiddleware,getOrderHistory);
router.get("/all-orders", authMiddleware,getAllOrders);
router.put("/update-status/:id", authMiddleware,updateStatus);
module.exports = router;



