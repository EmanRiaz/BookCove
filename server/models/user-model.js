const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      default: [],
    },
  ],
  
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); 

//secure the password with the bycrypt
userSchema.pre("save", async function(next){
  const user = this;
  if(!user.isModified("password")){
  next();
  }
  try{
  const saltRound = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(user.password, saltRound);
  user.password=hash_password;
  }catch (error){
    next(error);
  }
});

//compare the password
userSchema.methods.comparePassword = async function(password){
  try{
    return await bcrypt.compare(password, this.password);
  }catch(error){
    console.error(error);
  }
};

//json web token
userSchema.methods.generateToken = async function(){
 try{
  return jwt.sign({
    userId:this._id.toString(),
    email:this.email,
    isAdmin:this.isAdmin,
  },
  process.env.JWT_SECRET_KEY,
  {
    expiresIn:"8h",
  }
);
 }
  catch(error){
    console.error(error);
  } 
};
// define the model or the collection name
 const User = new mongoose.model("User", userSchema);//automatically it will create a collection named users.
module.exports=User;