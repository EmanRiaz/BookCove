import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

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
        console.error("Error fetching favourites:", error.response?.data || error.message);
      }
    };

    fetchFavourites();
  }, []);


return (
  <div className="grid grid-cols-4 gap-4">
    {FavouriteBooks.length > 0 ? (
      FavouriteBooks.map((item) => (
        <BookCard key={item._id} data={item} favourite={true}/> // Pass `item` as the `data` prop
      ))
    ) : (
      <p>No favourite books found</p>
    )}
  </div>
);
};