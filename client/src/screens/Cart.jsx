import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Nocart from "../assets/images/Nocart.png";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";  
import {useNavigate} from "react-router-dom";

export const Cart = () => {
  const navigate=useNavigate();
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0); 

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
        setCart(res.data.data); 
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setCart([]); 
      }
    };

    fetchCart();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/cart/remove-from-cart",
        {},
        {
          headers: { ...headers, bookid },
        }
      );
      toast.success(response.data.message);
    
      // Refetch cart to reflect the changes
      setCart((prevCart) => prevCart.filter((item) => item._id !== bookid));
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item from the cart.");
    }
  };
  useEffect(() => {
    if (cart && cart.length > 0) {
      let totalAmount = 0;
      cart.forEach((item) => {
        totalAmount += item.price;
      });
      setTotal(totalAmount);
    }
  }, [cart]);
  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/order/place-order`,
        { order: cart },
        { headers }
      );
      toast.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Error placing order:", error.response || error);
      toast.error("Failed to place order.");
    }
  };
  

  return (
    <>
      {!cart && 
      <div className="w-full h-[100%] flex items-center justify-center"> <Loader /> </div>}
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
                  <span className="mx-2 text-xl">{1}</span>
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
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4   w-full flex items-center justify-end">
          <div className="p-4  rounded ">
            <h1 className="text-3xl text-black font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between font-semibold text-xl text-black">
              <h2>{cart.length} Books</h2>
              <h2>Rs {total}</h2>
            </div>
            <div className="w-[100%] mt-3">
              <button 
                className="text-black bg-yellow-400 rounded px-4 py-2 flex justify-center w-full font-semibold"
               onClick={PlaceOrder}
             >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
