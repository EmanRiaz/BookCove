import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";
const BookCard = ({ data, favourite ,onRemove}) => {
  console.log(data);
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
      // Notify parent to update state
      if (onRemove) onRemove(data._id);
    } catch (error) {
      toast.error(
        'Error removing favourite:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-black rounded p-2 flex flex-col">
          <div className="bg-white rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-64" />
          </div>
          <h2 className="mt-3 text-yellow-400 text-2xl font-bold">
            {data.title}
          </h2>
          <p className="mt-2 text-white font-normal text-lg hover:text-yellow-400">
            <b>By :</b> {data.author}
          </p>
          <p className="mt-2 text-white font-normal text-lg hover:text-yellow-400">
            <b>Rs :</b> {data.price}
          </p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-black px-4 py-2 rounded border border-yellow-400 text-yellow-400 hover:text-black hover:bg-white hover:border-black"
          onClick={handleRemoveFavouriteBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
