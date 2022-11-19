import { IReportDTO, ReportCreateDTO } from './../interface/IReport';


// import bcrypt from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
// import { UserSignInDto } from '../interfaces/UserSignInDto';
// import { sc } from '../constants';

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

const findReportByUserId = async (userId) => {
    const data = await prisma.user_report.findFirst({
        where:{
            user_id: userId
        },
        orderBy:{
            created_at: 'asc'
        }
    });
    
    return data;
}

const findReportById = async (reportId) => {
    const data = await prisma.report.findFirst({
        where: {
            id: reportId
        } 
    })
    return data;
}


const reportDao = {
    createReport,
    findReportByUserId,
    findReportById
}

export default reportDao;