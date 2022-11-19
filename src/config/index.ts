import dotenv from "dotenv";

// 개발 환경 설정
// default: 'development'
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // 모든 프로세스 중지
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  // 포트 번호
  port: parseInt(process.env.PORT, 10),

  // postgreSQL 주소
  postgresURI: process.env.USER_ID,

  // 기본설정값
  defaultValue: {
    userId: process.env.DEFAULT_USER_ID,
  },

  // jwt 관련
  jwt: {
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGO,
  },

  // S3 관련
  aws: {
    bucket: process.env.AWS_BUCKET,
    s3AccessKey: process.env.AWS_ACCESS_KEY,
    s3SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};
