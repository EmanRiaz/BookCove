// *----------------------
//* express.Router
// *----------------------

//? In Express.js, express.Router() is a mini Express application without all the server configurations but with the ability to define routes, middleware, and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organized and maintainable.
//? Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

const express = require("express");
const router = express.Router();
const authcontrollers=require("../controllers/auth-controller");
const {signupSchema,loginSchema}=require("../validators/auth-validator");
const validate=require("../middlewares/validate-middleware");
const authMiddleware=require("../middlewares/auth-middleware");
router.route("/").get(authcontrollers.home);
router.route("/register").post( validate(signupSchema),authcontrollers.register);
router.route("/login").post(validate(loginSchema),authcontrollers.login);
//to get users data
//using middleware to check whether the user is authenticated or not and have a valid token
router.route("/user").get(authMiddleware,authcontrollers.user);
// Route for updating user address
router.put("/update-address/:userId", authMiddleware, authcontrollers.updateAddress); // Ensure authMiddleware is applied here

module.exports = router;