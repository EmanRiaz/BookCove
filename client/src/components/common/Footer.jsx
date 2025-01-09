import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white ">
      <div className="container  px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4  text-yellow-400">About BookCove</h3>
            <p className="text-sm">
              BookCove is your gateway to a world of stories. Discover a wide range of books that inspire, entertain and  educate. We are passionate about connecting readers to their next great adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold  text-yellow-400 mx-28 mb-4">Quick Links</h3>
            <ul className="text-sm  mx-16 space-y-2">
              <li>
                <a href="#about" className=" mx-14 hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#shop" className=" mx-14 hover:underline">
                  Shop Books
                </a>
              </li>
              <li>
                <a href="#contact" className="mx-14   hover:underline">
                  Contact Us
                </a>
              </li>
             
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-400 mx-28 mb-4">Contact Us</h3>
            <ul className="text-sm  mx-36 space-y-2">
              <li>Email</li>
              <li>Phone</li>
              <li>Address</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white  mt-10"></div>

          {/* Footer Bottom */}
        <div className="py-9  text-yellow-400 md:flex-row justify-between text-center">
          <p className=" text-sm  text-center">&copy; 2024 BookCove. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};
    

