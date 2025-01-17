import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";

export const Books = () => {
  const [Data, setData] = useState(null);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/books/all-books"
        );
        if (response.data.books) {
          setData(response.data.books);
        } else {
          setError("No books found.");
        }
      } catch (error) {
        console.error("Error fetching recent books:", error);
        setError("Failed to fetch books.");
      }
    };

    fetch();
  }, []);

  if (error) {
    return <div className="text-black">{error}</div>; // Display error message
  }
  return (
    <>          
      <div className="bg-white h-auto px-12 py-8">
        <h4 className="text-3xl text-black font-bold hover:text-yellow-400">Discover Your Bookshelf:</h4>
        {!Data ? (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        ) : (
          <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Data.map((item, i) => (
              <div key={i}>
                <BookCard data={item} />
              </div>
            ))}
          </div>
        )}
      </div>
      </>
    );
  };