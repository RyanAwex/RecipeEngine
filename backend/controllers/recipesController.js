// recipesController.js
import axios from "axios";

const API_KEY = process.env.API_KEY;

export const getRecipes = async (req, res) => {
  const { diet, query, includeIngredients, excludeIngredients, number } =
    req.query;

  let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

  if (diet) {
    apiUrl += `&diet=${diet}`;
  }
  if (query) {
    apiUrl += `&query=${query}`;
  }
  if (includeIngredients) {
    apiUrl += `&includeIngredients=${includeIngredients}`;
  }
  if (excludeIngredients) {
    apiUrl += `&excludeIngredients=${excludeIngredients}`;
  }
  if (number) {
    apiUrl += `&number=${number}`;
  }
  apiUrl += `&addRecipeInformation=true&fillIngredients=true`;

  try {
    const response = await axios.get(apiUrl);

    if (!response.data || response.data.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No recipes found matching your criteria",
      });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.log("Error fetching recipes: ", error.message);
    res.status(500).json({ message: "Server error during API call" });
  }
};

export const getRecipeByName = async (req, res) => {
  const { dietary, query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide a recipe name to search ('query' parameter is missing)",
    });
  }
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?diet=${
        dietary || ""
      }&query=${query}&apiKey=${API_KEY}&addRecipeInformation=true&fillIngredients=true`
    );

    if (!response.data || response.data.results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.log("Error: ", { error: error.message });
    res.status(500).json({ message: "Server error" });
  }
};

// import axios from "axios";

// const API_KEY = process.env.API_KEY;

// export const getRecipesByDietary = async (req, res) => {
//   const { dietary } = req.params;

//   if (!dietary) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Insufficient parameters provided" });
//   }
//   try {
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?diet=${dietary}&apiKey=${API_KEY}`
//     );

//     if (!response) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Recipe not found" });
//     }

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.log("Error: ", { error: error.message });
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getRecipeByName = async (req, res) => {
//   const { dietary, recipeName } = req.params;

//   if (!recipeName) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Insufficient parameters provided" });
//   }
//   try {
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?diet=${dietary}&query=${recipeName}&apiKey=${API_KEY}`
//     );

//     if (!response) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Recipe not found" });
//     }

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.log("Error: ", { error: error.message });
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getRecipesByIngredients = async (req, res) => {
//   const { dietary, include, exclude } = req.params;

//   if (!dietary || !include || !exclude) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Insufficient parameters provided" });
//   }

//   try {
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?diet=${dietary}&includeIngredients=${include}&excludeIngredients=${exclude}&apiKey=${API_KEY}`
//     );

//     if (!response) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Recipe not found" });
//     }

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.log("Error: ", { error: error.message });
//     res.status(500).json({ message: "Server error" });
//   }
// };
