import { query, pool } from './src/lib/db.js';

async function checkSchema() {
  try {
    console.log('Checking invoices table schema...');
    const columns = await query('SHOW COLUMNS FROM invoices');
    console.log('Columns:', columns);
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    await pool.end();
  }
}

checkSchema();
