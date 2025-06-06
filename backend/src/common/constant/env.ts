import { config } from 'dotenv';

config();
export const ENV = {
  //TypeOrm ENV
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),

  //Jwt ENV
  JwtSecret: process.env.JWT_SECRET,
  JwtExpire: process.env.JWT_EXPIRE,

  //APP
  App_Port: process.env.APP_PORT,

  //SUPER_ADMIN
  Super_Admin_Email: process.env.SUPER_ADMIN_EMAIL,
  Super_Admin_Password: process.env.SUPER_ADMIN_PASSWORD,
  Super_Admin_Name: process.env.SUPER_ADMIN_NAME,
  Super_Admin_Phone: process.env.SUPER_ADMIN_PHONE,
};
