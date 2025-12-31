import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  X,
  Plus,
  Save,
  Mail,
  LogOut,
  Trash2,
  RotateCcw,
  Heart,
  Loader,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DelayedLoginPrompt from "../components/DelayedLoginPrompt";
import { useAuthStore } from "../store/authStore";

const ProfilePage = ({
  user,
  pantry,
  favorites,
  disliked,
  dietary,
  setPantry,
  setFavorites,
  setDisliked,
  setDietary,
}) => {
  const [pantryInput, setPantryInput] = useState("");
  const [favoritesInput, setFavoritesInput] = useState("");
  const [dislikedInput, setDislikedInput] = useState("");

  const navigate = useNavigate();

  const { isLoading, deleteAccount, logout, reset, saveChanges } =
    useAuthStore();

  const dietChoices = [
    "Omnivore",
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Whole30",
  ];

  // Handlers
  const handleAddPantry = () => {
    if (pantryInput.trim()) {
      setPantry([...pantry, pantryInput.trim()]);
      setPantryInput("");
    }
  };

  const handleAddFavorite = () => {
    if (favoritesInput.trim()) {
      setFavorites([...favorites, favoritesInput.trim()]);
      setFavoritesInput("");
    }
  };

  const handleAddDisliked = () => {
    if (dislikedInput.trim()) {
      setDisliked([...disliked, dislikedInput.trim()]);
      setDislikedInput("");
    }
  };

  const removePantryItem = (index) => {
    setPantry(pantry.filter((_, i) => i !== index));
  };

  const removeFavoriteItem = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  const removeDislikedItem = (index) => {
    setDisliked(disliked.filter((_, i) => i !== index));
  };

  const toggleDietary = (diet) => {
    if (dietary.includes(diet)) {
      setDietary(dietary.filter((d) => d !== diet));
    } else {
      setDietary([...dietary, diet]);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async () => {
    try {
      await reset();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      navigate("/signup");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteConfirmation = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      await handleDelete();
    }
  };

  const handleChanges = async (e) => {
    e.preventDefault();
    try {
      await saveChanges(pantry, favorites, disliked, dietary);
    } catch (error) {
      console.log(error);
    }
  };

  // page code down here
  return (
    <div className="p-8">
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-sans rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* --- HEADER --- */}
        <header className="p-8 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm flex items-center gap-4">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-green-500 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-green-500">My Profile</h1>
        </header>

        <main className="flex-grow p-8 max-w-5xl mx-auto w-full space-y-8">
          {/* --- SECTION 1: USER INFO --- */}
          <section className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg flex flex-col md:flex-row items-center gap-8">
            <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center border-2 border-green-500 shadow-lg shadow-green-900/20">
              <User size={48} className="text-gray-300" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white capitalize">
                {user.name}
              </h2>
              <div className="flex items-center gap-2 text-gray-400 mt-1 justify-center md:justify-start">
                <Mail size={16} />
                <span>{user.email}</span>
              </div>
            </div>
            <div className="md:ml-auto">
              <button
                onClick={handleChanges}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg"
              >
                {isLoading ? (
                  <Loader className=" animate-spin mx-auto" size={24} />
                ) : (
                  <>
                    <Save size={18} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </section>

          {/* --- SECTION 2: DIETARY PREFERENCES --- */}
          <section
            id="dietary"
            className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg"
          >
            <h3 className="text-xl font-bold text-green-500 mb-6 pb-2 border-b border-gray-700">
              Dietary Preferences
            </h3>
            <div className="flex flex-wrap gap-3">
              {dietChoices.map((diet) => {
                const isSelected = dietary.includes(diet);
                return (
                  <button
                    key={diet}
                    onClick={() => toggleDietary(diet)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      isSelected
                        ? "bg-green-600 border-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                        : "bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-gray-200"
                    }`}
                  >
                    {diet}
                  </button>
                );
              })}
            </div>
          </section>

          {/* --- SECTION 3: PANTRY INVENTORY (Full Width) --- */}
          <section
            id="inventory"
            className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg flex flex-col"
          >
            <h3 className="text-xl font-bold text-green-500 mb-4 pb-2 border-b border-gray-700">
              Manage Inventory
            </h3>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={pantryInput}
                onChange={(e) => setPantryInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddPantry()}
                placeholder="Add ingredient..."
                className="flex-grow bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 capitalize"
              />
              <button
                onClick={handleAddPantry}
                className="bg-gray-700 hover:bg-green-600 text-white p-2 rounded-lg border border-gray-600 hover:border-green-500 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {pantry.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm border border-gray-600 flex items-center gap-2 group hover:border-gray-500 transition-colors"
                >
                  {item}
                  <button
                    onClick={() => removePantryItem(index)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* --- SECTION 4: INGREDIENT PREFERENCES (Half/Half) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Favorite Ingredients */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-green-400 mb-4 pb-2 border-b border-gray-700 flex items-center gap-2">
                <Heart size={20} /> Favorite Ingredients
              </h3>

              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={favoritesInput}
                  onChange={(e) => setFavoritesInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddFavorite()}
                  placeholder="Add favorite..."
                  className="flex-grow bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                />
                <button
                  onClick={handleAddFavorite}
                  className="bg-gray-700 hover:bg-green-500 text-white p-2 rounded-lg border border-gray-600 hover:border-green-500 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {favorites.map((item, index) => (
                  <span
                    key={index}
                    className="bg-green-900/30 text-green-200 px-3 py-1 rounded-md text-sm border border-green-700/50 flex items-center gap-2 group hover:border-green-500 transition-colors"
                  >
                    {item}
                    <button
                      onClick={() => removeFavoriteItem(index)}
                      className="text-green-500/70 hover:text-green-300"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Disliked Ingredients */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg flex flex-col">
              <h3 className="text-xl font-bold text-red-400 mb-4 pb-2 border-b border-gray-700">
                Disliked Ingredients
              </h3>

              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={dislikedInput}
                  onChange={(e) => setDislikedInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddDisliked()}
                  placeholder="Exclude ingredient..."
                  className="flex-grow bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={handleAddDisliked}
                  className="bg-gray-700 hover:bg-red-500 text-white p-2 rounded-lg border border-gray-600 hover:border-red-500 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {disliked.map((item, index) => (
                  <span
                    key={index}
                    className="bg-red-900/20 text-red-200 px-3 py-1 rounded-md text-sm border border-red-800/50 flex items-center gap-2 group hover:border-red-500 transition-colors"
                  >
                    {item}
                    <button
                      onClick={() => removeDislikedItem(index)}
                      className="text-red-500/70 hover:text-red-300"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* --- SECTION 5: ACTIONS (Logout, Reset, Delete) --- */}
          <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row w-full gap-4">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex-1 flex justify-center items-center gap-2 px-6 py-3 rounded-lg font-bold bg-gray-700 hover:bg-gray-600 text-gray-200 hover:text-white transition-all"
            >
              {isLoading ? (
                <Loader className=" animate-spin mx-auto" size={24} />
              ) : (
                <>
                  <LogOut size={18} /> Logout
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              disabled={isLoading}
              className="flex-1 flex justify-center items-center gap-2 px-6 py-3 rounded-lg font-bold bg-yellow-900/20 text-yellow-500 border border-yellow-700/50 hover:bg-yellow-900/40 transition-all"
            >
              {isLoading ? (
                <Loader className=" animate-spin mx-auto" size={24} />
              ) : (
                <>
                  <RotateCcw size={18} /> Reset Profile
                </>
              )}
            </button>

            <button
              onClick={deleteConfirmation}
              disabled={isLoading}
              className="flex-1 flex justify-center items-center gap-2 px-6 py-3 rounded-lg font-bold bg-red-900/20 text-red-500 border border-red-700/50 hover:bg-red-900/40 transition-all"
            >
              {isLoading ? (
                <Loader className=" animate-spin mx-auto" size={24} />
              ) : (
                <>
                  <Trash2 size={18} /> Delete Account
                </>
              )}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
