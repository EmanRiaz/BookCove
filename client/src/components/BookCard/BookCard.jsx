import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookCard = ({ data, favourite, onRemove }) => {
  if (!data) return null; // Safeguard against undefined `data`

  const headers = {
    id: localStorage.getItem('userId'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: data._id,
  };

  const handleRemoveFavouriteBook = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/api/favourite/remove-book-from-favourite',
        {},
        { headers }
      );
      toast.success(response.data.message);
      if (onRemove) onRemove(data._id);
    } catch (error) {
      toast.error(
        'Error removing favourite:',
        error.response?.data || error.message
      );
    }
  };
  return (

    <div className="border shadow-md p-4 bg-white">
    <Link to={`/view-book-details/${data._id}`}>
      <div className="flex flex-col items-center">
        {/* Image container with fixed dimensions */}
        <div className="w-full h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
          <img
            src={data.url}
            alt={data.title}
            className="w-full h-full object-contain transform transition-transform duration-300 hover:translate-y-2"
          />
        </div>
        {/* Book details */}
        <h2 className="mt-3 text-yellow-400 text-2xl font-bold  ">
          {data.title}
        </h2>
        <p className="mt-2 text-black font-normal text-lg hover:text-yellow-400 ">
          <b>By:</b> {data.author}
        </p>
        <p className="mt-2 text-black font-normal text-lg hover:text-yellow-400 ">
          <b>Rs:</b> {data.price}
        </p>
        </div>
    </Link>
    {favourite && (
      <div className="flex justify-center mt-4">
        <button
          className="bg-black px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:text-black hover:bg-white hover:border-black"
          onClick={handleRemoveFavouriteBook}
        >
          Remove from Favourites
        </button>
      </div>
    )}
  </div>
  
  );
};

export default BookCard;
