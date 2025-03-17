const express = require("express");
const {
  getUserMatches,
  getAllUserId,
  getAllUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user/matches", verifyToken, getUserMatches); // Uyğunlaşmaları əldə etmək
router.get("/users", getAllUser);
router.get("/users/:id", getAllUserId);

module.exports = router;
