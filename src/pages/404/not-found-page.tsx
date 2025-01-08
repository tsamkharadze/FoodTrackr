import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-center">
      <h1 className="text-6xl font-bold text-red-500 dark:text-red-400">404</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 transition duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
