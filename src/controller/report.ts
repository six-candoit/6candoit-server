import { ReportCreateDTO } from './../interface/IReport';
//Express
import { Request, Response, NextFunction} from "express";
import { validationResult } from "express-validator";

//Library
import { fail, success } from './../constants/response';
import { rm, sc } from "../constants";
import { reportService } from "../service";

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
    writePoint,
    finishReport
};

export default reportController;