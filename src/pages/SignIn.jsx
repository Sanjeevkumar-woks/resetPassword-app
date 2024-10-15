import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthService } from "../service/authService";

const SignIn = () => {
  const [data, setData] = useState({
    emailId: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "emailId ") {
      if (!value.trim()) {
        error = "Full Name is required";
      }
    } else if (name === "username") {
      if (!value.trim()) {
        error = "Username is required";
      } else if (value.length < 3) {
        error = "Username must be at least 3 characters";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    } else if (name === "confirmPassword") {
      if (!value) {
        error = "Confirm Password is required";
      } else if (value !== data.password) {
        error = "Passwords do not match";
      }
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validate = () => {
    let validationErrors = {};
    for (let field in data) {
      const error = validateField(field, data[field]);
      if (error) {
        validationErrors[field] = error;
      }
    }
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      if (data.password !== data.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // proceed with form submission (e.g., make API call)
      AuthService.register(data.username, data.emailId, data.password)
        .then((response) => {
          alert(response);
        })
        .catch((error) => {
          alert(error);
        });

      // reset form fields
      setData({
        emailId: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-400">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In to Your Account
        </h2>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="emailId"
            value={data.emailId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              errors.emailId ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
            required
          />
          {errors.emailId && (
            <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>
          )}
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your username"
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-3/4 transform -translate-y-1/2 right-3 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute top-3/4 transform -translate-y-1/2 right-3 text-gray-500"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <a href="/forgetPassword" className="text-indigo-600 hover:underline">
            Forgot Password?
          </a>
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
