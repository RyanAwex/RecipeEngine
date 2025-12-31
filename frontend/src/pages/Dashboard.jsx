import React, { useState } from "react";
import { User, Clock, X, ChefHat, Edit, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import DelayedLoginPrompt from "../components/DelayedLoginPrompt";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { HashLink } from "react-router-hash-link";

const Dashboard = ({ user, pantry, dietary, favorites, disliked }) => {
  // Mock State for recipes
  const [recipes, setRecipes] = useState([
    // {
    //   id: 1,
    //   title: "Roasted Root Vegetables",
    //   image:
    //     "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    //   readyInMinutes: 45,
    //   missedIngredientCount: 4,
    //   instructions:
    //     "1. Chop vegetables. 2. Season. 3. Roast at 400F for 40 mins.",
    //   extendedIngredients: [{ original: "2 Carrots" }, { original: "1 Onion" }],
    // },
  ]);

  const [recipeName, setRecipeName] = useState("");
  const [included, setIncluded] = useState("");
  const [excluded, setExcluded] = useState("");

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipesSearch = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/recipes?diet=${dietary}&query=${recipeName}&includeIngredients=${included}&excludeIngredients=${
          disliked.length > 0 ? disliked + "," : ""
        }${excluded}`,
        {
          withCredentials: true,
        }
      );
      setRecipes(response.data);
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRecipesSearch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col font-sans rounded-xl shadow-2xl overflow-hidden">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-start p-8 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div>
          <h1 className="text-4xl font-bold text-green-500 tracking-tight">
            RecipeEngine
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Manage your pantry, preferences, and recommendations.
          </p>
        </div>
        <Link
          to="/profile"
          className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 border border-gray-600 transition-colors"
        >
          <User className="w-6 h-6 text-green-500" />
        </Link>
      </header>

      <main className="flex-grow p-8 max-w-7xl mx-auto w-full">
        {/* --- BODY: SEARCH BOXES --- */}
        <div className="mb-10">
          <form className="grid grid-cols-1 gap-4 " onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search by Recipe Name..."
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
              onChange={(e) => setRecipeName(e.target.value)}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Included Ingredients (e.g. Chicken, Rice)"
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                onChange={(e) => setIncluded(e.target.value)}
              />
              <input
                type="text"
                placeholder="Excluded Ingredients (e.g. Peanuts, Gluten)"
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500"
                onChange={(e) => setExcluded(e.target.value)}
              />
            </div>
            <button
              type="submit"
              // onClick={handleRecipesSearch}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors mt-2"
            >
              Find Recipes
            </button>
          </form>
        </div>

        {/* --- RECIPE RESULTS --- */}
        {recipes.results && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recipes.results.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-green-900/20 transition-all duration-300"
              >
                <div className="h-[250px] w-full relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1">
                    <Clock size={14} /> {recipe.readyInMinutes}m
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-400 mb-2 truncate">
                    {recipe.title}
                  </h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 font-semibold mb-1">
                      Key Ingredients:
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {recipe.extendedIngredients
                        .map((i) => i.original)
                        .join(", ")}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="w-full bg-gray-700 hover:bg-green-600 hover:text-white text-green-400 border border-green-600/30 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <ChefHat size={18} /> Preparing
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- PANTRY & PREFERENCES --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pantry Box */}
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-500 mb-4 border-b border-gray-700 pb-2">
                Pantry Inventory
              </h2>
              <p className="text-gray-400 mb-6">
                Manage the items currently in your kitchen.
              </p>

              {/* Horizontal Scroll Container with Custom Scrollbar and cursor-grab */}
              <div
                className="flex overflow-x-auto gap-3 pb-4 mb-2 cursor-grab active:cursor-grabbing
                 [&::-webkit-scrollbar]:h-3
                 [&::-webkit-scrollbar-track]:bg-gray-900
                 [&::-webkit-scrollbar-track]:rounded-full
                 [&::-webkit-scrollbar-thumb]:bg-green-600
                 [&::-webkit-scrollbar-thumb]:rounded-full
                 [&::-webkit-scrollbar-thumb]:hover:bg-green-500"
              >
                {pantry.map((item, idx) => (
                  <span
                    key={idx}
                    className="whitespace-nowrap bg-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm border border-gray-600 flex-shrink-0 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Full Width Edit Button */}
            <HashLink
              smooth
              to="/profile/#inventory"
              className="w-full mt-4 bg-gray-700 hover:bg-green-600 text-gray-200 hover:text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all border border-gray-600 hover:border-green-500"
            >
              <Edit size={18} /> Edit Inventory
            </HashLink>
          </div>

          {/* Preferences Box */}
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-500 mb-4 border-b border-gray-700 pb-2">
                My Preferences
              </h2>
              <p className="text-gray-400 mb-6">
                Update your dietary restrictions and disliked ingredients.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center bg-gray-700/50 p-4 rounded-lg border border-gray-700">
                  <span className="text-gray-300 flex-grow">Diet Type</span>
                  {dietary.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-green-400 font-bold bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30 ml-2 text-sm flex-shrink-0 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Full Width Edit Button */}
            <HashLink
              smooth
              to="/profile/#dietary"
              className="w-full mt-4 bg-gray-700 hover:bg-green-600 text-gray-200 hover:text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all border border-gray-600 hover:border-green-500"
            >
              <Settings size={18} /> Edit Preferences
            </HashLink>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="p-6 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Rayane Sefiani. All rights reserved.
      </footer>

      {/* --- POPUP MODAL --- */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-700 overflow-hidden relative">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 bg-gray-900/80 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-900 [&::-webkit-scrollbar-thumb]:bg-green-600 [&::-webkit-scrollbar-thumb]:rounded-full">
              <h2 className="text-3xl font-bold text-green-500 mb-2">
                {selectedRecipe.title}
              </h2>
              <p className="text-gray-400 mb-6 flex items-center gap-2">
                <Clock size={16} /> Ready in {selectedRecipe.readyInMinutes}{" "}
                minutes
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">
                Ingredients Needed:
              </h3>
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-1">
                {selectedRecipe.extendedIngredients.map((ing, idx) => (
                  <li key={idx}>{ing.original}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">
                Description:
              </h3>
              <p className="text-gray-300 leading-relaxed bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                {
                  // Remove HTML tags from summary
                  selectedRecipe.summary
                    ? selectedRecipe.summary.replace(/<\/?[^>]+(>|$)/g, "")
                    : "No instructions available."
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
