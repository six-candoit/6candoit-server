import { PrismaClient } from "@prisma/client";

// DTO
import { IReportDTO } from "../interface/IReport";

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

const reportDAO = {
  getReportByUserIdExId,
  getReportByUserId,
};

export default reportDAO;
