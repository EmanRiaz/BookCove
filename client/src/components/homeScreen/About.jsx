import React from 'react';
import AboutImage from '../../assets/images/About.jpeg';


export const About = () => {

  return (
    <div className="bg-black text-white">
      {/* Image Section */}
      <div className="relative">
        <img
          src={AboutImage}
          alt="About BookCove - A bookstore"
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Greeting Section */}
      <h1 className="text-3xl font-bold text-yellow-400  mx-20  text-left mb-8">
       {/* Welcome {user ? `${user.username} to our website` : `To Our Website`}*/}
      </h1>

      {/* About Section */}
      <section className="py-10 px-6 lg:px-20 text-left">
        <p className="text-lg md:text-xl">
          At <strong>BookCove</strong>, we are passionate about the transformative power of literature. Founded with the belief that every book has the 
          potential to inspire, educate, and connect people, we strive to create a welcoming online space for readers of all ages and
           backgrounds. Our carefully curated collection features a diverse range of genres, from timeless classics to contemporary 
           bestsellers, ensuring that every reader can find something that resonates with them. Beyond just selling books, we are committed to fostering a vibrant community of book lovers through engaging events, discussions, and resources that celebrate the joy of reading. Whether you’re a lifelong bibliophile or just beginning your literary journey, BookCove is here to support and inspire you every step of the way.
        </p>
      </section>

      {/* Offerings, Community Engagement, and Collections Section */}
<section className="py-10 px-6 lg:px-20 bg-black">
  <h2 className="text-3xl font-bold text-left text-yellow-400 mb-8">Explore Our Features</h2>
  <div className="flex flex-wrap justify-center space-x-6">
    
    {/* Our Offerings */}
    <div className="flex-1 p-6 border border-none rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-yellow-300">Our Offerings</h3>
      <p>Wide Selection of Books</p>
      <p>Exclusive Discounts</p>
      <p>Online Events and Workshops</p>
    </div>
    
    {/* Community Engagement */}
    <div className="flex-1 p-6 border border-none rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-yellow-300">Community Engagement</h3>
      <p>Join Our Book Clubs</p>
      <p>Author Events</p>
      <p>Reading Challenges</p>
    </div>
    
    {/* Explore Our Collections */}
    <div className="flex-1 p-6 border border-none rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-yellow-300">Explore Our Collections</h3>
      <p>Bestsellers</p>
      <p>New Releases</p>
      <p>Curated Collections</p>
    </div>
    
  </div>
</section>

      {/* Commitment Section */}
      <section className="py-10 px-6 lg:px-20 text-left bg-black ">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8">Our Commitment</h2>
        <p className="text-lg md:text-xl">
          
          At <strong>BookCove</strong>, we believe that every book has the power to transform lives and foster connections. Our commitment extends beyond 
          selling books; we aim to create a vibrant community of readers who share a love for literature. We curate a diverse collection,
           from timeless classics to the latest bestsellers, ensuring there’s something for everyone. Our dedicated customer service team is
            here to make your experience enjoyable, while we actively support both established and emerging authors, providing a platform for
             diverse voices. We prioritize sustainability and promote literacy initiatives in underserved communities.
        </p>
      </section>
    </div>
  );
};
