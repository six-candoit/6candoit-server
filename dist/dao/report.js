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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getReportByUserIdExId = (userId, exId) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield prisma.report.findMany({
        where: {
            user_id: +userId,
            ex_id: exId,
        },
    });
    return reports;
});
const getReportByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reports = yield prisma.report.findMany({
        where: {
            user_id: +userId,
        },
    });
    return reports;
});
const createReport = (reportCreateDTO) => __awaiter(void 0, void 0, void 0, function* () {
    const returnReportDTO = yield prisma.report.create({
        data: {
            ex_id: reportCreateDTO.exId,
            content: reportCreateDTO.content,
            point: reportCreateDTO.point,
            ex_name: reportCreateDTO.exName,
            current_percent: 0,
            user_id: reportCreateDTO.userId,
        },
    });
    return returnReportDTO;
});
const findReportByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.report.findFirst({
        where: {
            user_id: userId,
        },
    });
    return data;
});
const deleteByReportId = (reportId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.report.delete({
        where: {
            id: reportId,
        },
    });
    return data;
});
const reportDAO = {
    createReport,
    findReportByUserId,
    deleteByReportId,
    getReportByUserIdExId,
    getReportByUserId,
};
exports.default = reportDAO;
//# sourceMappingURL=report.js.map