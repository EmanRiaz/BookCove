import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../Loader/Loader";
import BookCard from "../../BookCard/BookCard";

export const BestPicks = () => {
  const [Data, setData] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/books/recent-books",
        
        );
        setData(response.data.recentBooks);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };
  
    fetch();
  }, []);
  


  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-black font-bold">Best Picks</h4>
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Data &&
          Data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

