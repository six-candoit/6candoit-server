// DAO
import { userDAO } from "../dao";

// DTO
import { IUserDTO } from "../interface/IUser";

//* userId로 유저 조회
const getUser = async (userId: number) => {
  const user = userDAO.getUserById(userId);
  return user;
};

const checkUser = async (userId: number) => {
  const user = userDAO.getUserById(userId);
  if (user === null) return false;
  return true;
};

const userService = {
  getUser,
  checkUser,
};

export default userService;
