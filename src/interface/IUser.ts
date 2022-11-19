export interface IUserDTO {
  id: number;
  email: string;
  password: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
