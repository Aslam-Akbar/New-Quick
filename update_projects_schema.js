const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function updateSchema() {
  console.log('Connecting to database...');
  const connection = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: 'Bvm9FcvMXoWzkoK.root',
    password: 'i6mWwlCC3qq4na2f',
    database: 'QUICK',
    ssl: {
      minVersion: 'TLSv1.2',
      ca: fs.readFileSync(path.join(process.cwd(), 'isrgrootx1.pem')),
      rejectUnauthorized: true
    }
  });

  try {
    console.log('Adding missing columns to projects table...');
    
    try {
      await connection.execute(`ALTER TABLE projects ADD COLUMN github_url VARCHAR(500)`);
      console.log('✓ Added github_url column');
    } catch (e) {
      console.log('- github_url column already exists');
    }
    
    try {
      await connection.execute(`ALTER TABLE projects ADD COLUMN hosted_url VARCHAR(500)`);
      console.log('✓ Added hosted_url column');
    } catch (e) {
      console.log('- hosted_url column already exists');
    }
    
    try {
      await connection.execute(`ALTER TABLE projects ADD COLUMN next_meeting DATETIME`);
      console.log('✓ Added next_meeting column');
    } catch (e) {
      console.log('- next_meeting column already exists');
    }
    
    try {
      await connection.execute(`ALTER TABLE projects ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
      console.log('✓ Added updated_at column');
    } catch (e) {
      console.log('- updated_at column already exists');
    }
    
    try {
      await connection.execute(`ALTER TABLE projects ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`);
      console.log('✓ Added created_at column');
    } catch (e) {
      console.log('- created_at column already exists');
    }
    
    console.log('\n✓ Schema update complete!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
  }
}

updateSchema();
