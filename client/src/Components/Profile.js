import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Auth";
import Favourites from "./Favourites";
import UserDetails from "./UserDetails";
import OrderHistory from "./OrderHistory";
import Orders from "./Orders";
import AllUsers from "./AllUsers";
import "tailwindcss/tailwind.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [selectedSection, setSelectedSection] = useState("profile");
  const [profileDetails, setProfileDetails] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-user-info", { headers })
      .then((res) => {
        setProfileDetails(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigate("/login");
  };

  if (!isLoggedIn) {
    navigate("/login");
  }

  const renderContent = () => {
    switch (selectedSection) {
      case "profile":
        return (
          <div className="max-w-lg mx-auto rounded-xl p-6">
            <UserDetails profileDetails={profileDetails} />
          </div>
        );
      case "favorites":
        return (
          <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Favorites</h2>
            <Favourites />
          </div>
        );
      case "orders":
        return (
          <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Orders</h2>
            {isLoggedIn === true && role === "admin" ? <Orders /> : <OrderHistory />}
          </div>
        );
      case "AllUsers":
        return (
          <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">All Users</h2>
            {isLoggedIn === true && role === "admin" ? <AllUsers /> : " "}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-screen rounded-md">
      {/* Left Section */}
      <div className="lg:w-1/4 w-full bg-gray-800 text-white p-6 flex flex-col items-center justify-between h-full shadow-lg">
        <div className="w-full flex flex-col items-center">
          <img
            src={profileDetails?.avatar || "default-avatar.jpg"}
            alt="avatar"
            className="rounded-full w-24 h-24 mb-4 object-cover border-4 border-white shadow-lg"
          />
          <div
            className={`cursor-pointer py-3 px-6 text-center rounded-md w-full mb-4 transition-colors ${
              selectedSection === "profile"
                ? "bg-blue-600 font-bold"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedSection("profile")}
          >
            Profile
          </div>
          {isLoggedIn && role === "user" && (
            <div
              className={`cursor-pointer py-3 px-6 text-center rounded-md w-full mb-4 transition-colors ${
                selectedSection === "favorites"
                  ? "bg-blue-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedSection("favorites")}
            >
              Favorites
            </div>
          )}
          <div
            className={`cursor-pointer py-3 px-6 text-center rounded-md w-full mb-4 transition-colors ${
              selectedSection === "orders"
                ? "bg-blue-600 font-bold"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setSelectedSection("orders")}
          >
            Orders
          </div>
          {role === "admin" && (
            <div
              className={`cursor-pointer py-3 px-6 text-center rounded-md w-full mb-4 transition-colors ${
                selectedSection === "allUsers"
                  ? "bg-blue-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setSelectedSection("AllUsers")}
            >
              All Users
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-3 mt-6 bg-red-600 hover:bg-red-700 text-center text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Right Section */}
      <div className="lg:w-3/4 w-full p-6 rounded-md shadow-lg overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
