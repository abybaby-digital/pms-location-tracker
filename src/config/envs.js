import { config } from "dotenv";
config();

export const envs = {
  env: process.env.NODE_ENV || "dev",
  port: Number(process.env.NODE_PORT) || 4000,
  db: {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    dialect: process.env.DIALECT || "mysql",
  },
  redis: {
    REDIS_URL: process.env.REDIS_URL || "",
  },
  apiKey: process.env.API_KEY || "",
  passwordSalt: Number(process.env.PASSWORD_SALT_ROUND) || 12,
  jwt: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET || "",
      expiry: Number(process.env.ACCESS_TOKEN_EXPIRED) || 3600,
    },
  },
  smtp: {
    email: process.env.SMTP_AUTH_EMAIL,
    password: process.env.SMTP_AUTH_PASSWORD,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465,
    secure: process.env.SMTP_SECURE == "no" ? false : true,
    fromEmail: process.env.SMTP_FROM_EMAIL,
  },
  aws: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
    region: process.env.S3_REGION || "",
  },
  s3: {
    bucketName: process.env.S3_BUCKET_NAME || "",
  },
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || "ko",
  maxFileUploadSize: process.env.maxFileUploadSize || 20,
  siteUrl: process.env.siteUrl || "",
  adminSiteUrl: process.env.adminSiteUrl || "",
  PROJECT_NAME: process.env.PROJECT_NAME || "",
  DEFAULT_PAGE_LIMIT: process.env.DEFAULT_PAGE_LIMIT || 10,
  db1: {
    host: process.env.MYSQL_HOST1 || "localhost",
    port: process.env.MYSQL_PORT1 || 3306,
    database: process.env.MYSQL_DATABASE1,
    username: process.env.MYSQL_USERNAME1,
    password: process.env.MYSQL_PASSWORD1,
    dialect: process.env.DIALECT1 || "mysql",
  },
  TMDB_API_KEY: process.env.TMDB_API_KEY || "",
  KOBIS_API_KEY: process.env.KOBIS_API_KEY || "",
  SWAGGER_UI_ACCESS: {
    USER: process.env.SWAGGER_API_USER || "",
    PASSWORD: process.env.SWAGGER_API_PASSWORD || "",
  },
};
