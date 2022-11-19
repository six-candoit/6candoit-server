"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const dao_1 = require("../dao");
const dao_2 = require("../dao");
//* userId로 유저 조회
const getActiveReport = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userReport = yield dao_2.userReportDAO.getActiveUserReportByUserId(userId);
    const reports = yield dao_1.reportDAO.getReportByUserIdExId(+userId, userReport.report_id);
    return reports;
});
const getReports = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield dao_1.reportDAO.getReportByUserId(userId);
    return reports;
});
const writePoint = (reportRequestDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const reportResponse = yield dao_1.reportDAO.createReport(reportRequestDTO);
    if (!reportResponse) {
        return constants_1.sc.BAD_REQUEST;
    }
    return reportResponse;
});
const finishReport = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reportData = yield dao_1.reportDAO.findReportByUserId(userId);
    if (!reportData) {
        return constants_1.sc.BAD_REQUEST;
    }
    const reportId = reportData.id;
    const data = yield dao_1.reportDAO.deleteByReportId(reportId);
    if (!data) {
        return constants_1.sc.BAD_REQUEST;
    }
    return data;
});
const reportService = {
    getActiveReport,
    getReports,
    writePoint,
    finishReport
};
exports.default = reportService;
//# sourceMappingURL=report.js.map