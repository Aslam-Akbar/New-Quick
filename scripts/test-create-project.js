import { createProject } from '../app/actions/admin-projects.js';
import { query } from '../app/lib/db.js';

// Mock revalidatePath since we are running in a script
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

async function testCreateProject() {
  try {
    // 1. Create a dummy user and client profile first
    console.log('Creating dummy client...');
    const userResult = await query('INSERT INTO users (email, password) VALUES (?, ?)', ['test_adv@example.com', 'password']);
    const userId = userResult.insertId;
    
    const clientResult = await query(
      'INSERT INTO client_profiles (user_id, company_name, contact_name, plan_type) VALUES (?, ?, ?, ?)',
      [userId, 'Test Advance Corp', 'Test Contact', 'Basic']
    );
    const clientId = clientResult.insertId;
    console.log('Created client with ID:', clientId);

    // 2. Call createProject with advance amount
    console.log('Calling createProject...');
    const result = await createProject(clientId, {
        name: 'Test Project Advance',
        status: 'Pending',
        progress: 0,
        due_date: '2025-12-31',
        advanceAmount: 5000
    });

    console.log('createProject Result:', result);

    // 3. Verify Invoice
    const invoices = await query('SELECT * FROM invoices WHERE user_id = ?', [userId]);
    console.log('Invoices found:', invoices.length);
    if (invoices.length > 0) {
        console.log('Invoice Details:', invoices[0]);
    } else {
        console.error('NO INVOICE CREATED!');
    }

    // Cleanup
    await query('DELETE FROM invoices WHERE user_id = ?', [userId]);
    await query('DELETE FROM projects WHERE user_id = ?', [userId]);
    await query('DELETE FROM client_profiles WHERE id = ?', [clientId]);
    await query('DELETE FROM users WHERE id = ?', [userId]);

  } catch (error) {
    console.error('Test Failed:', error);
  }
}

testCreateProject();
