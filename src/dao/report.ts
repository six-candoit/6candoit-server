import { PrismaClient } from "@prisma/client";

// DTO
import { IReportDTO, ReportCreateDTO} from "../interface/IReport";

const prisma = new PrismaClient();

const getReportByUserIdExId = async (userId: number, exId: number) => {
  const reports = await prisma.report.findMany({
    where: {
      user_id: userId,
      ex_id: exId,
    },
  });
  return reports;
};

const getReportByUserId = async (userId: number) => {
  const reports = await prisma.report.findMany({
    where: {
      user_id: userId,
    },
  });
  return reports;
};

const createReport = async (reportCreateDTO:ReportCreateDTO) => {
    const returnReportDTO = await prisma.report.create({
        data: {
            ex_id: reportCreateDTO.exId,
            content: reportCreateDTO.content,
            point: reportCreateDTO.point,
            ex_name: reportCreateDTO.exName,
            current_percent: 0,
            user_id: reportCreateDTO.userId
        }
    })
    return returnReportDTO;
}

const findReportByUserId = async (userId:number) => {
    const data = await prisma.report.findFirst({
        where: {
            user_id: userId
        } 
    })
    return data;
}

const deleteByReportId = async (reportId:number) => {
    const data = await prisma.report.delete({
        where: {
            id: reportId
        }
    })
    return data;
}

const reportDAO = {
    createReport,
    findReportByUserId,
    deleteByReportId,
  getReportByUserIdExId,
  getReportByUserId,
};

export default reportDAO;