// DAO
import { reportDAO } from "../dao";
import { userReportDAO } from "../dao";

// DTO
import { IUserDTO } from "../interface/IUser";
import { IUserReportDTO } from "../interface/IUserReport";

// Library
import { rm } from "../constants";

//* userId로 유저 조회
const getActiveReport = async (userId: number) => {
  const userReport = await userReportDAO.getActiveUserReportByUserId(userId);
  const reports = await reportDAO.getReportByUserIdExId(+userId, userReport.report_id);

  return reports;
};

const getReports = async (userId: number) => {
  const reports = await reportDAO.getReportByUserId(userId);

  return reports;
};

const reportService = {
  getActiveReport,
  getReports,
};

export default reportService;
