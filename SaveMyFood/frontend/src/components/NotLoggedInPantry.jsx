import React from "react";
import { Link } from "react-router-dom";

function NotLoggedInPantry() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {/* Illustration */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/4150/4150897.png"
        alt="Locked Pantry"
        className="w-40 md:w-52 mb-6 opacity-90"
      />

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-3">
        Pantry Access Restricted
      </h2>

      {/* Description */}
      <p className="text-gray-600 max-w-md mb-6">
        You need to be logged in to track your pantry items and get expiry
        notifications.  
        Create a free account to start saving food and money!
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-orange-500 text-white px-5 py-2 rounded-lg shadow hover:bg-orange-600 transition"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default NotLoggedInPantry;
