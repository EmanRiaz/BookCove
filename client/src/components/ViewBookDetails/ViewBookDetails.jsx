import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const role=useSelector((state)=>state.auth.role);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        console.log("Response from backend:", response);
        if (response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) {
    return <Loader />;
  }
  const headers = {
    id: localStorage.getItem("userId"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourites = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/favourite/add-book-to-favourite",
        {}, 
        {
          headers: {
            id: localStorage.getItem("userId"), // User ID from local storage
            bookid: id, // Book ID from route params
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Auth token
          },
        }
      );
    toast.success(response.data.message);
  } catch (error) {
     toast.error(`An error occurred: ${error.message}`);
    }
   };
   const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/cart/add-to-cart",
        {}, // No body is required for this request
        {
          headers, // Ensure `headers` contains required fields like `id` and `bookid`
        }
      );
  
      // Handle success
      if (response.data && response.data.message) {
        toast.success(response.data.message);
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message); // Specific error from server
      } else {
        toast.error(`An unexpected error occurred: ${error.message}`); // General error
      }
    }
  };
  
     

  
  
  // Destructure book data
  const { url, title, author, desc, language, price } = data || {};

  return (
    <div className="px-12 py-8 bg-black flex flex-col md:flex-row gap-8">
      {/* Left Section: Book Image */}
      <div className="bg-white rounded p-4 h-[88vh] w-full md:w-3/6 flex items-center justify-center">
        <img
          src={url || "https://via.placeholder.com/150"}
          alt={title || "Book cover"}
          className="h-[70vh]"
        />
      </div>

      {/* Right Section: Book Details */}
      <div className="p-4 w-full md:w-3/6">
        <h1 className="text-4xl text-yellow-400 font-semibold">{title || "Untitled"}</h1>
        <p className="text-white  hover:text-yellow-400 mt-1">By {author || "Unknown Author"}</p>
        <p className="text-white hover:text-yellow-400 mt-4">{desc || "No description available."}</p>
        <p className="flex mt-4 items-center justify-start text-white">
          <GrLanguage className="me-3" />
          {language || "N/A"}
        </p>
        <p className="mt-4  text-3xl text-yellow-400 font-semibold">
           Rs {price || "0.00"}
        </p>

        {/* Buttons Section  for user*/}
        {isLoggedIn===true && role==="user"&&(  
        <div className="flex gap-4 mt-6">
          <button className="bg-white text-2xl p-2 rounded flex items-center  hover:bg-yellow-400 gap-2 shadow-md hover:shadow-lg transition" 
           onClick={handleFavourites}>
            <FaHeart className="text-black" />
            Add to Favorites
          </button>
          <button className="bg-white text-2xl p-2 rounded flex items-center hover:bg-yellow-400 gap-2 shadow-md hover:shadow-lg transition"
           onClick={handleCart}>

            <FaShoppingCart className="text-black" />
            Add to Cart
          </button>
        </div>
        )}
         {/* Buttons Section  for admin*/}
         {isLoggedIn===true && role==="admin"&&(  
        <div className="flex gap-4 mt-6">
          <button className="bg-white text-2xl p-2 rounded flex items-center  hover:bg-yellow-400 gap-2 shadow-md hover:shadow-lg transition">
            <FaEdit className="text-black" />
          Edit Cart          
          </button>
          <button className="bg-white text-2xl p-2 rounded flex items-center hover:bg-red-700 gap-2 shadow-md hover:shadow-lg transition">
            <MdDelete className="text-black" />
            Delete Cart
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default ViewBookDetails;
