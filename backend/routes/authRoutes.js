import express from "express";
import {
  loginRoute,
  logoutRoute,
  signupRoute,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  deleteAccountRoute,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signupRoute);
router.post("/login", loginRoute);
router.post("/logout", logoutRoute);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.delete("/delete-account", verifyToken, deleteAccountRoute);

export default router;
