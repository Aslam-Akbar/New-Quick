import { query } from '../src/lib/db.js';

async function migrate() {
  try {
    console.log('Adding live_link column to projects table...');
    await query(`
      ALTER TABLE projects
      ADD COLUMN live_link VARCHAR(255) DEFAULT NULL;
    `);
    console.log('Migration successful.');
  } catch (error) {
    if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('Column live_link already exists.');
    } else {
        console.error('Migration failed:', error);
    }
  }
}

migrate();
