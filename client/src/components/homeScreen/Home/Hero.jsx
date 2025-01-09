import React from "react";
import homeImage from "/src/assets/images/Bookhome.gif";

export const Hero = () => {
  return (
    <section
      id="home"
      className="bg-black text-white text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${homeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="flex flex-col justify-start items-center h-full py-10 px-4">
        <h2 className="text-4xl text-yellow-400 font-bold mb-6">
          The Book Lover's Dreamland Awaits!
        </h2>
        <p className="text-lg mb-8">
          Welcome to the place where bookworms unite to explore the magical realm of knowledge and stories.
        </p>
        <button className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600">
          Search Books
        </button>
      </div>
    </section>
  );
};
