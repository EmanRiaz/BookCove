// *----------------------
//* Controllers
// *----------------------

//? In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.
const User =require("../models/user-model");
const bcrypt=require("bcrypt");
const axios = require('axios');
const jwt = require('jsonwebtoken');
// *-------------------
// Home Logic
// *-------------------
const home =async(req,res)=>{
  try{
    console.log(req.body);
    res.status(200).send("Welcome to the home page");
  }  catch(error){
    res.status(500).json("internal server error ");
  }
  }; 

    // *-------------------
// Register Logic
// *-------------------
  const register=async(req,res,next)=>{
    try{
        console.log(req.body);
       const{username,email,phone,password,address}=req.body; 
       const userExist=await User.findOne({email:email});  //when use findOne method always use await
       if(userExist){
        return res.status(400).json({message:"email already exists"})
       }
       const userCreated=await User.create({username,email,phone,password,address});
        res.status(201)
        .json({msg:"registration successful",token:await userCreated.generateToken(),
            userId:userCreated._id.toString(),
        });
      
        
    }catch(error){ 
       res.status(500).json("internal server error");
      next(error);
    }
};

  // *-------------------
// Logic Logic
// *-------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    console.log(userExist);
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const user=await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        role:userExist.role,
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

 // *-------------------
// To send user data to the client-user logic
// *-------------------

const user=async(req,res)=>{
  try{
   const userData=req.user;
    console.log(userData);
    res.status(200).json({userData});
   
  }catch(error){
    console.log('error from the user route ${error}');
  }
};

// *-------------------
// Update Address Logic
// *-------------------
const updateAddress = async (req, res) => {
  try {
    const { userId } = req.params; 
    const { address } = req.body; 

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.address = address; // Update the address field
    await user.save(); // Save the changes

    res.status(200).json({
      message: "Address updated successfully",
      updatedAddress: user.address,
    });
  } catch (error) {
    console.error(`Error updating address: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};



  module.exports = {
    home,
    register,login,user,updateAddress
  };  







