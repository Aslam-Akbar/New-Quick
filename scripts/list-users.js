import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certPath = path.join(process.cwd(), 'isrgrootx1.pem');

const pool = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  port: 4000,
  user: 'Bvm9FcvMXoWzkoK.root',
  password: 'i6mWwlCC3qq4na2f',
  database: 'QUICK',
  ssl: {
    minVersion: 'TLSv1.2',
    ca: fs.readFileSync(certPath),
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

async function listUsers() {
  try {
    console.log('Checking users table...');
    const [users] = await pool.execute('SELECT id, email FROM users');
    console.log(`Found ${users.length} users:`);
    users.forEach(u => console.log(`- ID: ${u.id}, Email: ${u.email}`));
    
    console.log('\nChecking client_profiles table...');
    const [profiles] = await pool.execute('SELECT id, company_name, user_id FROM client_profiles');
    console.log(`Found ${profiles.length} profiles:`);
    profiles.forEach(p => console.log(`- ID: ${p.id}, Company: ${p.company_name}, UserID: ${p.user_id}`));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

listUsers();
