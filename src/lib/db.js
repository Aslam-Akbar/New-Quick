import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

export const pool = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: 'Bvm9FcvMXoWzkoK.root',
  password: 'i6mWwlCC3qq4na2f',
  database: 'QUICK',
  ssl: {
    minVersion: 'TLSv1.2',
    ca: fs.readFileSync(path.join(process.cwd(), 'isrgrootx1.pem')),
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database Error:', error);
    console.error('Database Error:', error);
    throw new Error(`Database Error: ${error.message}`);
  }
}
