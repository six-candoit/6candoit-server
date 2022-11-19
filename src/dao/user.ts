import { PrismaClient } from "@prisma/client";

// DTO
import { IUserDTO } from "../interface/IUser";

const prisma = new PrismaClient();

const getUserById = async (userId: number) => {
  const user: IUserDTO = await prisma.user.findFirst({
    where: {
      id: userId,
      is_deleted: false,
    },
  });

  return user;
};

const userDAO = {
  getUserById,
};

export default userDAO;
