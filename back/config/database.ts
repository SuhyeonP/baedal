import * as dotenv from 'dotenv';

dotenv.config();

const dbconfig = {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'badal',
};
export default dbconfig;
