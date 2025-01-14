import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Nocart from "../assets/images/Nocart.png";
import { AiFillDelete } from "react-icons/ai";

export const Cart = () => {
  const [cart, setCart] = useState(null);

  const headers = {
    id: localStorage.getItem("userId"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/cart/get-user-cart",
          { headers }
        );
        setCart(res.data.data); // Set cart with fetched data
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCart([]); 
      }
    };

    fetchCart();
  }, []);

  
return (
  <>
    {!cart && <Loader />}
    {cart && cart.length === 0 && (
      <div className="h-screen">
        <div className="h-[100%] flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-white">
            Empty Cart
          </h1>
          <img src={Nocart} alt="No Cart" className="lg:h-[50vh]" />
        </div>
      </div>
    )}
    {cart && cart.length > 0 && (
      <>
        <h1 className="text-2xl flex justify-center font-semibold text-black my-5">Your Cart</h1>
        {/* Table Header */}
        <div className="w-full flex flex-row justify-between p-4 bg-yellow-400 rounded text-xl font-semibold text-black">
          <div className="w-1/5 text-center">Book Image</div>
          <div className="w-1/5 text-center">Title</div>
          <div className="w-1/5 text-center">Price</div>
          <div className="w-1/5 text-center">Quantity</div>
          <div className="w-1/5 text-center">Delete</div>
        </div>
        {/* Cart Items */}
        {cart.map((item, i) => (
          <div
            className="w-full my-4 rounded flex flex-row p-4 bg-white items-center justify-between"
            key={i}
          >
            {/* Book Image */}
            <div className="w-1/5 flex justify-center">
              <img
                src={item.url}
                alt={item.title}
                className="h-[20vh] md:h-[10vh] object-cover"
              />
            </div>
            {/* Book Title */}
            <div className="w-1/5 text-center">
              <h1 className="text-xl text-black font-semibold">
                {item.title}
              </h1>
            </div>
            {/* Book Price */}
            <div className="w-1/5 text-center">
              <h2 className="text-xl text-black font-semibold">
                Rs {item.price}
              </h2>
            </div>
            {/* Quantity Controls */}
            <div className="w-1/5 flex flex-col items-center">
              <div className="flex items-center">
                <button
                  className="bg-gray-200 px-3 py-1 rounded-l text-black"
                >
                  -
                </button>
                <span className="mx-2 text-xl">{ 1}</span>
                <button
                  className="bg-gray-200 px-3 py-1 rounded-r text-black"
                >
                  +
                </button>
              </div>
            </div>
            {/* Delete Button */}
            <div className="w-1/5 flex justify-center">
              <button
                className="bg-red-100 text-red-700 border border-red-700 rounded p-2 flex items-center"
              >
                <AiFillDelete />
              </button>
            </div>
          </div>
        ))}
      </>
    )}
  </>
);
};