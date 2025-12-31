import SignupRoute from "./pages/SignupRoute";
import LoginRoute from "./pages/LoginRoute";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DashboardLayout from "./pages/DashboardLayout";
import { useAuthStore } from "./store/authStore";

function App() {
  const { checkAuth, isCheckingAuth, isAuthenticated } = useAuthStore();
  const [user, setUser] = useState({});
  const [pantry, setPantry] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [dietary, setDietary] = useState([]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          { withCredentials: true }
        );
        const userData = response.data.user;
        const profileData = response.data.profile;

        setUser(userData);
        setPantry(profileData.inventory || []);
        setFavorites(profileData.favouriteIngredients || []);
        setDisliked(profileData.dislikedIngredients || []);

        let rawDiet = profileData.dietary || [];
        // 1. Check if it's the "One String" issue ["A, B"] and fix it
        if (
          rawDiet.length > 0 &&
          typeof rawDiet[0] === "string" &&
          rawDiet[0].includes(",")
        ) {
          // Split by comma to separate them
          rawDiet = rawDiet[0].split(",");
        }

        // 2. Clean up: Trim whitespace and Capitalize words to match buttons
        const formattedDiet = rawDiet.map((item) => {
          return item
            .trim() // Remove spaces " gluten free" -> "gluten free"
            .toLowerCase() // "gluten free"
            .split(" ") // ["gluten", "free"]
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // ["Gluten", "Free"]
            .join(" "); // "Gluten Free"
        });

        setDietary(formattedDiet);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getProfileData();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (!user.isVerified) {
      return <Navigate to="/verify-email" replace />;
    }

    return children;
  };

  // redirect authenticated users to the home page
  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center p-4">
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard
                user={user}
                pantry={pantry}
                dietary={dietary}
                favorites={favorites}
                disliked={disliked}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile
                user={user}
                pantry={pantry}
                favorites={favorites}
                disliked={disliked}
                dietary={dietary}
                setPantry={setPantry}
                setFavorites={setFavorites}
                setDisliked={setDisliked}
                setDietary={setDietary}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignupRoute />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/dashboard-test" element={<DashboardLayout />} />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginRoute />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
