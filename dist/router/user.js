"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Middleware
const middlewares_1 = require("../middlewares");
// Controller
const controller_1 = require("../controller");
const router = express_1.default.Router();
router.get("/", middlewares_1.authMiddleware, controller_1.userController.getUser);
module.exports = router;
//# sourceMappingURL=user.js.map