import ForgetPassword from "./pages/ForgetPassword ";
import HomePage from "./pages/HomePage";

import ResetPassword from "./pages/ResetPassword ";

import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import Login from "./pages/Login";

export default function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="App-container">
      <Routes>
        {user ? (
          <Route exact path="/" element={<HomePage />} />
        ) : (
          <Route exact path="/" element={<Login />} />
        )}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signIn" element={<SignIn />} />
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route exact path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
}
