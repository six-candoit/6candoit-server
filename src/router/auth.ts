import express from "express";

// Middleware
import { auth } from "../middlewares";

// // Controller
// import authController from "../controller/auth";

const router = express.Router();

// router.get("/email", auth, auth.getEmailController);

module.exports = router;
