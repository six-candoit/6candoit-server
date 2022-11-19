import { Router } from "express";

// Middleware
import { authMiddleware } from "../middlewares";

// Controller
import { reportController } from "../controller";

const router: Router = Router();
router.get("/", authMiddleware, reportController.getActiveReport);
router.get("/all", authMiddleware, reportController.getActiveReport);

module.exports = router;
