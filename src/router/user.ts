import express from "express";

// Middleware
import { authMiddleware } from "../middlewares";

// Controller
import { userController } from "../controller";

const router = express.Router();
router.get("/", authMiddleware, userController.getUser);

module.exports = router;
