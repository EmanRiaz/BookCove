import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegImage from '../assets/images/Register.png';
import { registerApi } from "../api/authApi";

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await registerApi(data);
      console.log(response);
      toast.success("Registration successful!");

      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.extraDetails || error.message || "An error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="text-black body-font relative bg-black">
      <div className="container px-3 py-20 mx-auto flex sm:flex-nowrap flex-wrap">
        {/* Image Section */}
        <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative bg-black">
          <img
            src={RegImage}
            alt="Placeholder"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/3 md:w-1/2 bg-black flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-yellow-400 text-lg mb-1 font-medium title-font">
            Registration Form
          </h2>
          <p className="leading-relaxed mb-5 text-white">
            Unlock a World of Stories – Your Next Adventure Awaits!
          </p>

          <form onSubmit={handleSubmit(onSubmit)   } className="space-y-4 w-full" noValidate>
            {/* Username Field */}
            <div>
              <input
                type="text"
                {...register("username", {
                  required: "Username is required.",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters long."
                  }
                })}
                placeholder="Enter your username"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address."
                  }
                })}
                placeholder="Enter your email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required.",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Phone number must be 10-15 digits long."
                  }
                })}
                placeholder="Enter your phone number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Address Field */}
            <div>
              <textarea
                {...register("address", {
                  required: "Address is required.",
                  maxLength: {
                    value: 200,
                    message: "Address cannot exceed 200 characters."
                  }
                })}
                placeholder="Enter your address"
                rows="3"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long."
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    message: "Password must contain at least one letter and one number."
                  }
                })}
                placeholder="Enter your password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:yellow-500"
            >
              Register Now
            </button>
          </form>
          <p className="mt-4 text-sm text-white text-center" >
            Already have an account?{" "}
            <a href="/login" className="text-yellow-400 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
