"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Middleware
const middlewares_1 = require("../middlewares");
// Controller
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
router.get("/", middlewares_1.authMiddleware, controller_1.reportController.getActiveReport);
router.get("/all", middlewares_1.authMiddleware, controller_1.reportController.getExReportAll);
router.post("/", controller_1.reportController.writePoint);
router.post("/end", controller_1.reportController.finishReport);
module.exports = router;
//# sourceMappingURL=report.js.map