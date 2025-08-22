import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Dashboard", user: req.user });
});

export default router;
