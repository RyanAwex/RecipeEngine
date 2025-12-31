import express from "express";

import {
  getProfile,
  updateProfile,
  resetProfile,
} from "../controllers/profileController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.put("/update-profile", verifyToken, updateProfile);
router.put("/reset-profile", verifyToken, resetProfile);

export default router;
