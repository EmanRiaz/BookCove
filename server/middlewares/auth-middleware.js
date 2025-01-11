//create middleware to check whether the user is authenticated or not
//json web token verification
const jwt=require("jsonwebtoken");
const User=require("../models/user-model");
const authMiddleware=async(req,res,next)=>{
const token =req.header("Authorization");
if(!token){
    //if you attempt to use an expired token,you'll receive a "401 Unauthorized http" response.
    return res
    .status(401)
    .json({message:"Unauthorized HTTP,Token not provided"});
}
 // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
 const jwtToken = token.replace("Bearer", "").trim();
 console.log("Token form auth middleware",jwtToken);
   

try{
    const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
    const userData=await User.findOne({email:isVerified.email}).
    select({
        password:0,// excluding password from the response
    });
    if (!userData) {
        return res.status(401).json({ message: "Unauthorized. User not found." });
      }
    console.log(userData);
    req.user=userData;
    req.token=token;
    req.userID= userData._id;
/*
    // If the user is not an admin, return "Access Denied"
    if (userData.role !== "admin") {
        return res.status(403).json({ message: "Access denied. You are not an admin." });
      }
        */
  
    next();
}catch(error){
    return res.status(401).json({message:"Unauthorized.Invalid token"});
}
 
};
module.exports=authMiddleware;