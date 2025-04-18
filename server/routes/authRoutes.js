import express from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import "../controllers/googleAuth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateUserProfile);

router.put("/password", verifyToken, updatePassword);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token, user } = req.user;
    const userStr = encodeURIComponent(JSON.stringify(user));
    res.redirect(`http://localhost:3000/login?token=${token}&user=${userStr}`);
  }
);

export default router;
