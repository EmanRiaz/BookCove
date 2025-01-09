import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr"; // Import the language icon

const ViewBookDetails = () => {
  const { id } = useParams(); // 'id' from URL parameters
  const [data, setData] = useState(null); // Initialize state as null
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        console.log("Response from backend:", response);

        // Check if response contains expected data
        if (response.data && response.data.data) {
          setData(response.data.data); // Set book data
        } else {
          setError("No book details found.");
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false); // Ensure loading stops after the fetch
      }
    };

    fetch();
  }, [id]);

  // Display loader while fetching data
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-black">{error}</div>;
  }

  const { url, title, author, desc, language, price } = data || {};

  return (
    <div className="px-12 py-8 bg-black flex gap-8 flex-col md:flex-row">
      {/* Left Section: Book Image */}
      <div className="bg-white rounded p-4 h-[88vh] w-3/6 flex items-center justify-center ">
        <img
          src={url || "https://via.placeholder.com/150"} 
          alt={title || "Book cover"} 
          className="h-[70vh]"
        />
      </div>

      {/* Right Section: Book Details */}
      <div className="p-4 w-3/6">
        <h1 className="text-4xl text-white font-semibold">{title || "Untitled"}</h1>
        <p className="text-zinc-400 mt-1">by {author || "Unknown Author"}</p>
        <p className="text-zinc-400 mt-4">{desc || "No description available."}</p>
        <p className="flex mt-4 items-center justify-start text-white">
          <GrLanguage className="me-3" />
          {language || "N/A"}
        </p>
        <p className="mt-4 text-white text-3xl font-semibold">
          Price: Rs {price || "0.00"}
        </p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
