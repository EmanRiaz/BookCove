import { NavLink } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full h-full p-8 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
        <h2 className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text animate-gradient mb-4">
          404
        </h2>
        <h4 className="text-2xl font-semibold text-gray-800 mb-2 uppercase tracking-wider">
          Sorry! Page not found
        </h4>
        <p className="text-gray-600 mb-6">
          Oops! It seems like the page you're trying to access doesn't exist. If
          you believe there's an issue, feel free to report it, and we'll look
          into it.
        </p>
        <div className="mt-6">
          <NavLink
            to="/"
            className="inline-block px-6 py-2 text-white bg-indigo-600 rounded-full text-lg font-medium uppercase tracking-wide hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          >
            Return Home
          </NavLink>
        </div>
      </div>
    </section>
  );
};
