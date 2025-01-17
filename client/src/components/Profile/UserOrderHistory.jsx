import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "../Loader/Loader";
import NoOrder from "../../assets/images/NoOrder.jpg";
import { Link } from "react-router-dom"; // Correct import for Link

export const UserOrderHistory = () => {
  const [userOrderHistory, setOrderHistory] = useState(); // Changed to userOrderHistory
  const headers = {
    id: localStorage.getItem("userId"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/order/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {!userOrderHistory && (
        <div className='flex items-center justify-center h-[100%]'>
          <Loader />
        </div>
      )}
      {userOrderHistory && userOrderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-white'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-3xl font-semibold text-zinc mb-8'>
              No Order History
            </h1>
            <img
              src={NoOrder}
              alt="image missing"
              className='h-[20vh] mb-8'
            />
          </div>
        </div>
      )}
      {userOrderHistory && userOrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc">
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc mb-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className=''>Mode</h1>
            </div>
          </div>
          {userOrderHistory.map(({ book, Status }, i) => (
            <div
              key={book._id || i}
              className='bg-zinc w-full rounded py-2 px-4 flex gap-4 hover:bg:zinc'
            >
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link
                  to={`/view-book-details/${book._id}`}
                  className="hover:text-blue"
                >
                  {book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1 className="">{book.desc.slice(0, 50)}...</h1>
              </div>
              <div className='w-[9%]'>
                <h1 className=''>Rs{book.price}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='font-semibold text-green'>
                  {status === "Order Placed" ? (
                    <div className='text-yellow'>{Status}</div>
                  ) : status === "Cancelled" ? (
                    <div className='text-red'>{Status}</div>
                  ) : (
                    Status
                  )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className="text-sm text-zinc ">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
