import React from "react";
import FavImage from "/src/assets/images/FavBook.png";

export const FavouriteReads = () => {
  return (
    <section id="about" className="py-16 bg-black text-yellow-400">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Image Section */}
        <div className="lg:w-1/2 p-4">
          <img
            src={FavImage}
            alt="Favorite Reads"
            className="w-full h-auto rounded-lg"
          />
        </div>
        {/* Text Content Section */}
        <div className="lg:w-1/2 text-center lg:text-left p-4">
          <h3 className="text-3xl font-bold mb-4">
            <span className="text-white">Your Favourite</span> <span className="text-yellow-400">Reads</span>
            <br />
            <span className="text-yellow-400">Are Here!</span>
          </h3>
          <p className="mb-6 text-white">
            Buy your favorite books online with ease! Enjoy exclusive offers and discounts on selected titles.
            Dive into our collection and find special deals that make reading more affordable. Shop now and unlock
            more savings with every purchase!
          </p>
          <div className="flex justify-center lg:justify-start space-x-8">
            <div className="text-center">
              <h4 className="text-2xl font-bold">800+</h4>
              <p>Books Available</p>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold">1K+</h4>
              <p>Readers Worldwide</p>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold">50+</h4>
              <p>Genres</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
