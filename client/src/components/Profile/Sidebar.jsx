import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import{authActions} from "../../redux/slices/authSlice";
import { FaHeart, FaHistory, FaCogs, FaBoxes, FaUpload } from 'react-icons/fa'; 

export const Sidebar = ({ data }) => {
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-black text-white h-full w-64 flex flex-col justify-between">
      {/* User Info */}
      <div className="p-4 flex flex-col items-center">
        <img src={data.avatar} alt="User Avatar" className="h-16 w-16 rounded-full border-2 border-black" />
        <p className="mt-3 text-lg font-semibold">{data.username}</p>
        <p className="text-sm text-white">{data.email}</p>
        <div className="border-t-2 border-white mt-4 w-full" />
      </div>

      {/* Navigation */}
      <div className="flex-grow">
        {role === "user" && (
          <div>
            <Link
              to="/profile"
              className="flex items-center justify-center gap-2 py-2 px-4 hover:bg-yellow-400 transition duration-300"
            >
              <FaHeart /> Favourites
            </Link>
            <Link
              to="/profile/orderHistory"
              className="flex items-center justify-center gap-2 py-2 px-4 hover:bg-yellow-400 transition duration-300"
            >
              <FaHistory /> Order History
            </Link>
            <Link
              to="/profile/settings"
              className="flex items-center justify-center gap-2 py-2 px-4 hover:bg-yellow-400 transition duration-300"
            >
              <FaCogs /> Settings
            </Link>
          </div>
        )}
        {role === "admin" && (
          <div>
            <Link
              to="/profile/manage-orders"
              className="flex items-center justify-center gap-2 py-2 px-4 hover:bg-blue-600 transition duration-300"
            >
              <FaBoxes /> Manage Orders
            </Link>
            <Link
              to="/profile/upload-book"
              className="flex items-center justify-center gap-2 py-2 px-4 hover:bg-blue-600 transition duration-300"
            >
              <FaUpload /> Upload Book
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
