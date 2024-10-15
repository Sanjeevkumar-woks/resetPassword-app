import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { AuthService } from "../service/authService";

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    AuthService.logout();
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-800">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">
          Welcome, {user}!
        </h1>
        <p className="mb-6 text-gray-600">You are now on the Home Page.</p>
        <button
          className="text-white bg-blue-500 px-6 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
