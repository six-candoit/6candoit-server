"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReportDAO = exports.reportDAO = exports.userDAO = void 0;
var user_1 = require("./user");
Object.defineProperty(exports, "userDAO", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var report_1 = require("./report");
Object.defineProperty(exports, "reportDAO", { enumerable: true, get: function () { return __importDefault(report_1).default; } });
var userReport_1 = require("./userReport");
Object.defineProperty(exports, "userReportDAO", { enumerable: true, get: function () { return __importDefault(userReport_1).default; } });
//# sourceMappingURL=index.js.map