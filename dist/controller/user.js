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
// Service
const service_1 = require("../service");
// Library
const constants_1 = require("../constants");
const response_1 = require("./../constants/response");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        return res.status(constants_1.sc.BAD_REQUEST).send((0, response_1.fail)(constants_1.sc.BAD_REQUEST, constants_1.rm.BAD_REQUEST));
    }
    const user = yield service_1.userService.getUser(+userId);
    // get report
    const activeReports = yield service_1.reportService.getActiveReport(userId);
    let total = 100;
    let currentName = null;
    yield Promise.all(activeReports.map((activeReport) => __awaiter(void 0, void 0, void 0, function* () {
        total += activeReport.point;
        if (!currentName)
            currentName = activeReport.ex_name;
    })));
    const data = {
        userId,
        name: user.nickname,
        percent: total,
        currentName,
    };
    return res.status(constants_1.sc.OK).send((0, response_1.success)(constants_1.sc.OK, constants_1.rm.READ_USER_SUCCESS, data));
});
const user = {
    getUser,
};
exports.default = user;
//# sourceMappingURL=user.js.map