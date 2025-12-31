import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming react-router-dom for Link
import { Loader } from "lucide-react";

const DelayedLoginPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a timer to update the state after 1000 milliseconds (1 second)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  const SpinningLoader = () => (
    <div className="flex items-center justify-center">
      <Loader size={36} className="animate-spin text-green-500" />
    </div>
  );

  if (!isVisible) {
    return <div className="text-white text-center">{<SpinningLoader />}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="p-10 bg-gray-800 rounded-xl shadow-2xl text-center space-y-6 border border-gray-700">
        <h2 className="text-3xl font-bold text-red-500">Access Denied</h2>
        <p className="text-gray-300 text-lg">
          Please login to view your profile and manage your preferences.
        </p>
        <Link
          to="/login"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg text-lg"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default DelayedLoginPrompt;
