import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthService } from "../service/authService";

const ResetPassword = () => {
  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirmNew: false,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    setToken(token);
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "currentPassword") {
      if (!value) error = "Current Password is required";
    } else if (name === "newPassword") {
      if (!value) {
        error = "New Password is required";
      } else if (value.length < 6) {
        error = "New Password must be at least 6 characters";
      }
    } else if (name === "confirmNewPassword") {
      if (!value) {
        error = "Confirm New Password is required";
      } else if (value !== data.newPassword) {
        error = "New Password and Confirm Password do not match";
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
    if (data.newPassword !== data.confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      AuthService.resetPassword(token, data.newPassword)
        .then((response) => {
          alert(response.message);
        })
        .catch((error) => {
          alert(error);
        });

      setData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      // alert("Password changed successfully");
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-800">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Change Password
        </h2>

        {/* Current Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="currentPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Current Password
          </label>
          <input
            type={showPassword.current ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            value={data.currentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              errors.currentPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your current password"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("current")}
            className="absolute top-3/4 transform -translate-y-1/2 right-3 text-gray-500"
          >
            {showPassword.current ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            New Password
          </label>
          <input
            type={showPassword.new ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={data.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your new password"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("new")}
            className="absolute top-3/4 transform -translate-y-1/2 right-3 text-gray-500"
          >
            {showPassword.new ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="confirmNewPassword"
            className="block text-gray-700 font-semibold mb-2"
          >
            Confirm New Password
          </label>
          <input
            type={showPassword.confirmNew ? "text" : "password"}
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={data.confirmNewPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500 ${
              errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Confirm your new password"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("confirmNew")}
            className="absolute top-3/4 transform -translate-y-1/2 right-3 text-gray-500"
          >
            {showPassword.confirmNew ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmNewPassword}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center mb-6">
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
          <a href="/signIn" className="text-indigo-600 hover:underline">
            Register
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors duration-300"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
