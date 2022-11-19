
import { Request, Response } from "express";
import { validationResult } from "express-validator";

// Service
import { userService } from "../service";
import { reportService } from "../service";

// DTO
import { IUserDTO } from "../interface/IUser";
import { ReportCreateDTO } from './../interface/IReport';

// Library
import { rm, sc } from "../constants";
import { fail, success } from "./../constants/response";
import { userReportDAO } from "../dao";

const getActiveReport = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const user: IUserDTO = await userService.getUser(+userId);

  // check request
  if (!userId) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  // check User
  if (!user) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
  }

  // get report
  const activeReports = await reportService.getActiveReport(userId);

  let bad = 0;
  let good = 0;
  let total = 100;
  let currentName = null;
  const history = Array();

  await Promise.all(
    activeReports.map(async (activeReport) => {
      if (activeReport.point > 0) bad += activeReport.point;
      if (activeReport.point < 0) good += activeReport.point;
      total += activeReport.point;

      if (!currentName) currentName = activeReport.ex_name;

      const eachHistory = {
        content: activeReport.content,
        point: activeReport.point,
        currentPercent: activeReport.current_percent,
      };

      history.push(eachHistory);
    })
  );

  const data = {
    userId,
    name: user.nickname,
    percent: total,
    currentName,
    good,
    bad,
    history,
  };

  return res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, data));
};

const getExReportAll = async (req: Request, res: Response) => {
  const { userId } = req.body;

  const user: IUserDTO = await userService.getUser(+userId);

  // check request
  if (!userId) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  // check User
  if (!user) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_USER));
  }

  // get report
  const reports = await reportService.getReports(userId);

  // get active report
  const userReport = await userReportDAO.getActiveUserReportByUserId(userId);

  let reportList = Array();

  await Promise.all(
    reports.map(async (report) => {
      let currentName = null;
      let total = 100;
      const history = Array();

      if (report.ex_id !== userReport.report_id) {
        total += activeReport.point;

        if (!currentName) currentName = activeReport.ex_name;

        const eachHistory = {
          content: activeReport.content,
          point: activeReport.point,
          currentPercent: activeReport.current_percent,
        };

        history.push(eachHistory);
      }
    })
  );

  const data = {
    userId,
    name: user.nickname,
    reportList,
  };

  return res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, data));
};


const writePoint = async (req:Request, res:Response, next:NextFunction) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
    }

    const reportCreateDTO:ReportCreateDTO = req.body;

    const data = await reportService.writePoint(reportCreateDTO);

    if(!data) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.OK, rm.BAD_REQUEST));
    }

    return res.status(sc.OK).send(success(sc.OK, rm.REPORT_CREATE_SUCCESS));
};

const finishReport = async (req:Request, res:Response) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
    }

    const { userId } = req.body;

    const data = reportService.finishReport(Number(userId));

    if (!data) {
        return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
    }

    return res.status(sc.OK).send(success(sc.OK, rm.REPORT_FINISH_SUCCESS));
} 

const reportController = {
  getActiveReport,
  getExReportAll,
    writePoint,
    finishReport
};

export default reportController;
