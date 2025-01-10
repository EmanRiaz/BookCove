import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from '../api/authApi';
import LoginImage from '../assets/images/Login.jpeg';
import Googlelogo from "../assets/Logos/GoogleLogo.png";
import { authActions } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await loginApi(data);
      console.log(response);
      toast.success("Login successful!");
      dispatch(authActions.setUser());
      dispatch(authActions.changeRole(response.role));

      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('role', response.role);

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
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div className="hidden md:flex items-center justify-center">
          <img
            src={LoginImage}
            alt="Login Illustration"
            className="w-full max-w-md"
          />
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
            Welcome to BookCove
          </h2>
          <p className="text-sm text-white mb-6 text-center">
            The door to your next chapter is just a login away.
          </p>

          <h1 className="text-3xl font-bold text-yellow-400 mb-4">
            Login to Your Account
          </h1>
          <p className="text-sm text-white mb-6 text-center">
            Access your account and explore our amazing features.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm space-y-4 bg-black p-6 rounded-lg shadow-lg" noValidate
          >
            {/* Email Field */}
            <div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format.",
                  },
                })}
                placeholder="Enter your email"
                className="w-full p-3 bg-white rounded-md text-black focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long.",
                  },
                })}
                placeholder="Enter your password"
                className="w-full p-3 bg-white rounded-md text-black focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition duration-300"
            >
              Login Now
            </button>
          </form>

          <p className="mt-4 text-sm text-white">
            Don’t have an account?{" "}
            <a href="/register" className="text-yellow-400 hover:underline">
              Register here
            </a>
          </p>

          {/* Google Login Button */}
          <button
            className="mt-4 flex items-center justify-center gap-2 py-3 w-full max-w-sm bg-black text-white font-semibold rounded-md hover:ring-yellow-400 transition duration-300"
          >
            <img src={Googlelogo} alt="Google Logo" className="w-5 h-5" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
