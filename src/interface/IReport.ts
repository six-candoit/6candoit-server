export interface IReportDTO {
  id: number;
  exId: number;
  exName: string;
  content: string;
  point: number;
  currentPercent: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
