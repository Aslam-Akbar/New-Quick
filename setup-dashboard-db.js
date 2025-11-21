const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setup() {
  console.log('Connecting to database...');
  const connection = await mysql.createConnection({
    host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
    port: 4000,
    user: 'Bvm9FcvMXoWzkoK.root',
    password: 'i6mWwlCC3qq4na2f',
    database: 'QUICK',
    ssl: {
      minVersion: 'TLSv1.2',
      ca: fs.readFileSync(path.join(__dirname, 'isrgrootx1.pem')),
      rejectUnauthorized: true
    }
  });

  try {
    console.log('Creating tables...');
    
    // Client Profiles (Updated with missing columns)
    await connection.execute('DROP TABLE IF EXISTS client_profiles');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS client_profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        company_name VARCHAR(255),
        contact_name VARCHAR(255),
        plan_type VARCHAR(50),
        phone VARCHAR(50),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Projects (Updated)
    await connection.execute('DROP TABLE IF EXISTS project_timeline'); // Drop dependent table first
    await connection.execute('DROP TABLE IF EXISTS projects');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255),
        progress INT,
        status VARCHAR(50),
        due_date DATE,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Project Timeline (Keep existing)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS project_timeline (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT NOT NULL,
        label VARCHAR(255),
        status VARCHAR(50),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      )
    `);

    // Invoices (Updated)
    await connection.execute('DROP TABLE IF EXISTS invoices');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        amount DECIMAL(10, 2),
        status VARCHAR(50),
        date DATE,
        due_date DATE,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Tickets (Updated)
    await connection.execute('DROP TABLE IF EXISTS ticket_replies'); // Drop dependent table first
    await connection.execute('DROP TABLE IF EXISTS tickets');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        subject VARCHAR(255),
        status VARCHAR(50),
        priority VARCHAR(20) DEFAULT 'Medium',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Ticket Replies (NEW)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ticket_replies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ticket_id INT NOT NULL,
        sender VARCHAR(50),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ticket_id) REFERENCES tickets(id)
      )
    `);

    // Meetings (NEW)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS meetings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255),
        meeting_date DATETIME,
        link VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Recent Files (Keep existing)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS recent_files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255),
        type VARCHAR(50),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Admin Users (NEW)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Job Postings (NEW)
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS job_postings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50),
        location VARCHAR(100),
        department VARCHAR(100),
        description TEXT,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Drop old stats table if exists
    await connection.execute('DROP TABLE IF EXISTS dashboard_stats');

    console.log('Tables created/updated.');

    // Get User ID
    const [users] = await connection.execute('SELECT id FROM users WHERE email = ?', ['test@example.com']);
    if (users.length === 0) {
      console.log('Test user not found.');
      return;
    }
    const userId = users[0].id;

    // Insert Data
    console.log('Inserting real data...');

    // Invoices (Sum = 4500)
    await connection.execute('DELETE FROM invoices WHERE user_id = ?', [userId]);
    await connection.execute(`
      INSERT INTO invoices (user_id, amount, status, date, due_date) VALUES
      (?, 2000.00, 'Paid', '2023-09-15', '2023-10-01'),
      (?, 2500.00, 'Paid', '2023-10-15', '2023-11-01'),
      (?, 1500.00, 'Unpaid', '2023-11-15', '2023-12-01')
    `, [userId, userId, userId]);

    // Tickets (2 Open)
    await connection.execute('DELETE FROM tickets WHERE user_id = ?', [userId]);
    await connection.execute(`
      INSERT INTO tickets (user_id, subject, status, priority) VALUES
      (?, 'Login issue on mobile', 'Closed', 'Medium'),
      (?, 'Update logo on landing page', 'Open', 'High'),
      (?, 'API documentation request', 'Open', 'Low')
    `, [userId, userId, userId]);

    // Meetings (Next one)
    await connection.execute('DELETE FROM meetings WHERE user_id = ?', [userId]);
    await connection.execute(`
      INSERT INTO meetings (user_id, title, meeting_date, link) VALUES
      (?, 'Sprint Review', DATE_ADD(NOW(), INTERVAL 2 DAY), 'https://meet.google.com/abc-defg-hij')
    `, [userId]);

    // Seed Admin User (admin@quicks.com / admin123)
    // In a real app, password should be hashed. For this demo, we'll store plain text or handle hashing in the app.
    // Let's assume simple comparison for now or update auth logic later.
    await connection.execute('DELETE FROM admin_users WHERE email = ?', ['admin@quicks.com']);
    await connection.execute(`
      INSERT INTO admin_users (email, password, name, role) VALUES
      (?, ?, ?, ?)
    `, ['admin@quicks.com', 'admin123', 'Super Admin', 'super_admin']);

    // Seed Job Postings
    await connection.execute('DELETE FROM job_postings');
    await connection.execute(`
      INSERT INTO job_postings (title, type, location, department, status) VALUES
      ('Senior React Developer', 'Full-time', 'Remote', 'Engineering', 'active'),
      ('Backend Engineer (Node.js)', 'Full-time', 'Remote', 'Engineering', 'active'),
      ('UI/UX Designer', 'Contract', 'Remote', 'Design', 'active'),
      ('Technical Project Manager', 'Full-time', 'New York, NY', 'Product', 'active')
    `);

    console.log('Real relational data inserted.');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await connection.end();
    console.log('Done.');
  }
}

setup();
