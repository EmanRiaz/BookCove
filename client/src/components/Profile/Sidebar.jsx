import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa'; // Importing the icon

export const Sidebar = ({ data ,favourite}) => {
  return (
    <div className="bg-white p-4 flex flex-col items-center justify-between h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} alt="User Avatar" className="h-[12vh] rounded-full" />
        <p className="mt-3 text-xl text-black font-semibold">{data.username}</p>
        <p className="mt-1 text-normal text-black">{data.email}</p>
        <div className=" mt-4 bg-white hidden lg:block">
          <div className="w-full flex-col items-center  text-xl justify-center hidden lg:flex">
            <Link
              to="/profile"
              className="text-black font-semibold w-full py-2 text-center hover:bg-yellow-300 transition-all duration-300"
            >
              Favourites
            </Link>
            <Link
              to="/profile/orderHistory"
              className="text-black font-semibold w-full py-2 mt-4 text-center hover:bg-yellow-300 transition-all duration-300"
            >
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className="text-black font-semibold w-full py-2 mt-4 text-center hover:bg-yellow-300 transition-all duration-300"
            >
              Settings
            </Link>
            <div>
              
            <button
                className="text-black font-semibold py-2 mt-4 w-full flex items-center justify-center  gap-2 hover:bg-yellow-300 transition-all duration-300"
              >
                Logout
                <FaSignOutAlt className="text-xl" />
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
