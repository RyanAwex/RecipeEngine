import express from "express";
import {
  getRecipes,
  getRecipeByName,
} from "../controllers/recipesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getRecipes);

router.get("/search", verifyToken, getRecipeByName);

export default router;
