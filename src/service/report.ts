// DAO
import { ReportCreateDTO } from './../interface/IReport';
import { sc } from '../constants';
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


const writePoint = async (reportRequestDTO: ReportCreateDTO) => {
    const reportResponse = await reportDAO.createReport(reportRequestDTO);
    
    if (!reportResponse) {
        return sc.BAD_REQUEST
    }

    return reportResponse;
}

const finishReport = async (userId:number) => {

    const reportData = await reportDAO.findReportByUserId(userId);

    if(!reportData) {
        return sc.BAD_REQUEST;
    }

    const reportId = reportData.id;

    const data = await reportDAO.deleteByReportId(reportId);

    if (!data) {
        return sc.BAD_REQUEST;
    }
    return data;
}

const reportService = {
  getActiveReport,
  getReports,
  writePoint,
    finishReport
};

export default reportService;