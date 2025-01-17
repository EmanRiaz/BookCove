import React from "react";
import Mainlogo from "../../assets/Logos/LogoBC.png";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
export const Header = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "Books", link: "/books" },
    { title: "About", link: "/about" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
    {title:  "Logout",link:"/logout"},
  ];  

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role =useSelector((state)=>state.auth.role);
  if (isLoggedIn === false) {
    links.splice(3, 4);
  }
  if (isLoggedIn == true && role=== "user")
    {
      links.splice(5,1);
    }
  if (isLoggedIn == true && role=== "admin")
  {
    links.splice(4,1)

  }
  return (
    <>
        <nav className="z-50 relative flex justify-between items-center bg-black text-white px-8 py-4">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src={Mainlogo} alt="BookCove Logo" />
          <h1 className="text-2xl hover:text-yellow-400 font-semibold">BookCove</h1>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links-bookcove block text-xl md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, i) => (
              
              <Link
                to={item.link}
                className="transition-all duration-300 hover:text-yellow-400"
                key={i}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Conditional Login/Register Links */}
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="px-2 py-1 border border-yellow-400 hover:text-yellow-400 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-2 py-1 border border-yellow-400 hover:text-yellow-400 transition-all duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Icon */}
        <button className="text-white text-2xl hover:text-gray-300 md:hidden">
          <FaGripLines />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden absolute bg-black text-white h-screen w-full top-0 left-0 z-40 flex flex-col items-center justify-center">
        {links.map((item, i) => (
          <Link
            to={item.link}
            className="text-white mb-4 text-4xl font-semibold hover:text-yellow-400 transition-all duration-300"
            key={i}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
};
