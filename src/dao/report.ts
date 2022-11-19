import { IReportDTO, ReportCreateDTO } from './../interface/IReport';

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createReport = async (reportCreateDTO:ReportCreateDTO) => {
    const returnReportDTO = await prisma.report.create({
        data: {
            ex_id: reportCreateDTO.exId,
            content: reportCreateDTO.content,
            point: reportCreateDTO.point,
            ex_name: reportCreateDTO.exName,
            current_percent: 0
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


const reportDao = {
    createReport,
    findReportByUserId
}

export default reportDao;