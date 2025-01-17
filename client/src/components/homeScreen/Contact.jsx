import { useState } from "react";
import { toast } from "react-toastify";
import { contactApi } from "../../api/contactApi";
const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await contactApi(contact); // Call the service function
      setContact(defaultContactFormData); // Reset form
      console.log(data); // Log the response
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error(error.message || "Message not sent!");
      console.error(error);
    }
  };

  return (
    <section className="text-gray-400 bg-black body-font relative">
      <div className="absolute inset-0 bg-black-100">
        <iframe
          title="map"
          width="100%"
          height="100%"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.860014203177!2d74.26104077442298!3d31.473036749481196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905ed9abd421d%3A0x2a6aed8d8b99ad6d!2sIIFA%20TECH!5e0!3m2!1sen!2s!4v1734822755814!5m2!1sen!2s"
          style={{ filter: "grayscale(1) opacity(0.4)" }}
        ></iframe>
      </div>
      <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/2 md:w-2/3 bg-black shadow-md rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
          <h2 className="text-yellow-500 text-lg mb-1 font-medium title-font">
            Contact Us
          </h2>
          <p className="leading-relaxed text-white mb-5">
            Share Your Ideas, Book Recommendations, or Questions!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="username" className="leading-7 text-sm text-black">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={contact.username}
                onChange={handleInput}
                className="w-full bg-white rounded border border-yellow-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleInput}
                className="w-full bg-white rounded border border-yellow-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="leading-7 text-sm text-black">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={contact.message}
                onChange={handleInput}
                className="w-full bg-white rounded border border-yellow-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-900 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button className="text-black bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
