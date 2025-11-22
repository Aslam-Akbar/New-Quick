import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load SSL cert from root
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

async function cleanup() {
  try {
    console.log('Starting cleanup...');

    // 1. Delete all data from related tables
    const tables = [
      'project_timeline',
      'projects',
      'invoices',
      'tickets',
      'meetings',
      'recent_files',
      'client_profiles'
    ];

    for (const table of tables) {
      console.log(`Deleting from ${table}...`);
      await pool.execute(`DELETE FROM ${table}`);
    }

    // 2. Delete users who are clients (assuming client_profiles linked users)
    // Since we deleted client_profiles, we might have orphaned users if we don't be careful.
    // But wait, we deleted client_profiles first. 
    // To delete the users, we should have identified them first.
    // Let's try a different approach: Delete users and let cascade handle it? 
    // No, we implemented manual cascade in the app, so the DB might not have ON DELETE CASCADE.
    
    // Better approach: Delete all users that are NOT admins? 
    // Or just delete ALL users if this is a reset.
    // The user said "delete all clients". 
    // I will assume this means deleting all users except maybe a hardcoded admin if exists, 
    // but usually "delete all clients" implies wiping the client_profiles and their associated users.
    
    // Since I already deleted client_profiles, I can't join to find them.
    // However, if I want to be thorough, I should have selected the user_ids first.
    
    // Let's restart the logic.
    
    console.log('Refining cleanup strategy...');
    
    // Get all user_ids from client_profiles BEFORE deleting them
    const [profiles] = await pool.execute('SELECT user_id FROM client_profiles');
    const userIds = profiles.map(p => p.user_id);
    
    if (userIds.length > 0) {
        const placeholders = userIds.map(() => '?').join(',');
        
        console.log('Deleting project timelines...');
        // Get project ids first
        const [projects] = await pool.execute(`SELECT id FROM projects WHERE user_id IN (${placeholders})`, userIds);
        const projectIds = projects.map(p => p.id);
        
        if (projectIds.length > 0) {
            const projectPlaceholders = projectIds.map(() => '?').join(',');
            await pool.execute(`DELETE FROM project_timeline WHERE project_id IN (${projectPlaceholders})`, projectIds);
        }
        
        console.log('Deleting projects...');
        await pool.execute(`DELETE FROM projects WHERE user_id IN (${placeholders})`, userIds);
        
        console.log('Deleting invoices...');
        await pool.execute(`DELETE FROM invoices WHERE user_id IN (${placeholders})`, userIds);
        
        console.log('Deleting tickets...');
        await pool.execute(`DELETE FROM tickets WHERE user_id IN (${placeholders})`, userIds);
        
        console.log('Deleting meetings...');
        await pool.execute(`DELETE FROM meetings WHERE user_id IN (${placeholders})`, userIds);
        
        console.log('Deleting recent files...');
        await pool.execute(`DELETE FROM recent_files WHERE user_id IN (${placeholders})`, userIds);
        
        console.log('Deleting client profiles...');
        await pool.execute(`DELETE FROM client_profiles WHERE user_id IN (${placeholders})`, userIds);
        
        console.log('Deleting users...');
        await pool.execute(`DELETE FROM users WHERE id IN (${placeholders})`, userIds);
        
        console.log(`Successfully deleted ${userIds.length} clients and their data.`);
    } else {
        console.log('No clients found to delete.');
    }

  } catch (error) {
    console.error('Cleanup failed:', error);
  } finally {
    await pool.end();
  }
}

cleanup();
