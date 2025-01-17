import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import { toast } from "react-toastify";

export const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const headers = {
          id: localStorage.getItem("userId"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        console.log("Headers:", headers);
        const response = await axios.get(
          "http://localhost:5000/api/favourite/get-favourite-books",
          { headers }
        );
        console.log("Favourites Data:", response.data.data);

        // Set the favorite books only if the request succeeds
        setFavouriteBooks(response.data.data);

      } catch (error) {
        toast.error("Error fetching favourites:", error.response?.data || error.message);
      }
    };

    fetchFavourites();
  }, []);
 
 // Remove a book from the state
 const removeFromFavourites = (bookId) => {
  setFavouriteBooks((prevBooks) =>
    prevBooks.filter((book) => book._id !== bookId)
  );
};

return (
  <>
    {FavouriteBooks.length === 0 && (
      <div className="text-5xl font-semibold h-96 text-yellow-400 flex items-center justify-center w-full bg-black "
      
>
        No Favourite Books
      </div>
    )}
    <div className="grid grid-cols-3 gap-4 bg-white">
      {FavouriteBooks.map((item) => (
        <BookCard
          key={item._id}
          data={item}
          favourite={true}
          onRemove={removeFromFavourites}
        />
      ))}
    </div>
  </>
);
};