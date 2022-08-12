import {createPool} from 'mysql2/promise';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path : path.resolve(
    (process.env.NODE_ENV === 'production') ? '.production.env' : (process.env.NODE_ENV === 'stage') ? '.stage.env' : '.development.env'
  )
});

const option = {
  host : process.env.DATABASE_HOST,
  database : process.env.DATABASE_NAME,
  user : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  port : 3306,
  charset : process.env.DATABASE_CHARSET
};

const mysql = createPool(option);

export default mysql;