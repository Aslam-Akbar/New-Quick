import { query, pool } from './src/lib/db.js';

async function migrate() {
  try {
    console.log('Adding currency column to invoices table...');
    await query('ALTER TABLE invoices ADD COLUMN currency VARCHAR(10) DEFAULT "INR"');
    console.log('Migration successful!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

migrate();
