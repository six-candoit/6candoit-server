import { PrismaClient } from "@prisma/client";

// DTO
import { IReportDTO } from "../interface/IReport";
import { IUserReportDTO } from "../interface/IUserReport";

const prisma = new PrismaClient();

const getActiveUserReportByUserId = async (userId: number) => {
  const userReport = await prisma.user_report.findFirst({
    where: {
      user_id: +userId,
      is_active: true,
    },
  });

  return userReport;
};

const getUserReportByUserId = async (userId: number) => {
  const userReport = await prisma.user_report.findFirst({
    where: {
      user_id: +userId,
    },
  });

  return userReport;
};

const userReportDAO = {
  getActiveUserReportByUserId,
  getUserReportByUserId,
};

export default userReportDAO;
