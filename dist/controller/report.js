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
const express_validator_1 = require("express-validator");
// Service
const service_1 = require("../service");
const service_2 = require("../service");
// Library
const constants_1 = require("../constants");
const response_1 = require("./../constants/response");
const dao_1 = require("../dao");
const getActiveReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield service_1.userService.getUser(+userId);
    // check request
    if (!userId) {
        return res.status(constants_1.sc.BAD_REQUEST).send((0, response_1.fail)(constants_1.sc.BAD_REQUEST, constants_1.rm.BAD_REQUEST));
    }
    // check User
    if (!user) {
        return res.status(constants_1.sc.BAD_REQUEST).send((0, response_1.fail)(constants_1.sc.BAD_REQUEST, constants_1.rm.NO_USER));
    }
    // get report
    const activeReports = yield service_2.reportService.getActiveReport(userId);
    let bad = 0;
    let good = 0;
    let total = 100;
    let currentName = null;
    const history = Array();
    yield Promise.all(activeReports.map((activeReport) => __awaiter(void 0, void 0, void 0, function* () {
        if (activeReport.point > 0)
            bad += activeReport.point;
        if (activeReport.point < 0)
            good += activeReport.point;
        total += activeReport.point;
        if (!currentName)
            currentName = activeReport.ex_name;
        const eachHistory = {
            content: activeReport.content,
            point: activeReport.point,
            currentPercent: activeReport.current_percent,
        };
        history.push(eachHistory);
    })));
    const data = {
        userId,
        name: user.nickname,
        percent: total,
        currentName,
        good,
        bad,
        history,
    };
    return res.status(constants_1.sc.OK).send((0, response_1.success)(constants_1.sc.OK, constants_1.rm.READ_USER_SUCCESS, data));
});
const getExReportAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const user = yield service_1.userService.getUser(+userId);
    // check request
    if (!userId) {
        return res.status(constants_1.sc.BAD_REQUEST).send((0, response_1.fail)(constants_1.sc.BAD_REQUEST, constants_1.rm.BAD_REQUEST));
    }
    // check User
    if (!user) {
        return res.status(constants_1.sc.BAD_REQUEST).send((0, response_1.fail)(constants_1.sc.BAD_REQUEST, constants_1.rm.NO_USER));
    }
    // get report
    const reports = yield service_2.reportService.getReports(userId);
    // get active report
    const userReport = yield dao_1.userReportDAO.getActiveUserReportByUserId(userId);
    let reportList = Array();
    // await Promise.all(
    //   reports.map(async (report) => {
    //     let total = 100;
    //     if (report.ex_id !== userReport.report_id) {
    //       total += report.point;
    //       if (!reportList[report.ex_id].currentName) reportList[report.ex_id].currentName = report.ex_name;
    //       reportList[report.ex_id].total += report.point;
    //     }
    //   })
    // );
    const data = {
        userId,
        name: user.nickname,
        reportList,
    };
    return res.status(constants_1.sc.OK).send((0, response_1.success)(constants_1.sc.OK, constants_1.rm.READ_USER_SUCCESS, data));
});
const writePoint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(constants_1.sc.BAD_REQUEST).send((0, response_1.fail)(constants_1.sc.BAD_REQUEST, constants_1.rm.BAD_REQUEST));
    }
    const reportCreateDTO = req.body;
    const data = yield service_2.reportService.writePoint(reportCreateDTO);
    if (!data) {
        return res.status(constants_1.sc.BAD_REQUEST).send((0, response_1.fail)(constants_1.sc.OK, constants_1.rm.BAD_REQUEST));
    }
    return res.status(constants_1.sc.OK).send((0, response_1.success)(constants_1.sc.OK, constants_1.rm.REPORT_CREATE_SUCCESS));
});
const finishReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(constants_1.sc.BAD_REQUEST).send((0, response_1.fail)(constants_1.sc.BAD_REQUEST, constants_1.rm.BAD_REQUEST));
    }
    const { userId } = req.body;
    const data = service_2.reportService.finishReport(Number(userId));
    if (!data) {
        return res.status(constants_1.sc.BAD_REQUEST).send((0, response_1.fail)(constants_1.sc.BAD_REQUEST, constants_1.rm.BAD_REQUEST));
    }
    return res.status(constants_1.sc.OK).send((0, response_1.success)(constants_1.sc.OK, constants_1.rm.REPORT_FINISH_SUCCESS));
});
const reportController = {
    getActiveReport,
    getExReportAll,
    writePoint,
    finishReport,
};
exports.default = reportController;
//# sourceMappingURL=report.js.map