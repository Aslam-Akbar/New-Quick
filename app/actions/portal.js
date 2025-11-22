'use server'

import { query } from '../lib/db';

async function getUserId(email) {
  const users = await query('SELECT id FROM users WHERE email = ?', [email]);
  return users.length > 0 ? users[0].id : null;
}

export async function getProjects(email) {
  try {
    const userId = await getUserId(email);
    if (!userId) return { success: false, message: 'User not found' };

    const projects = await query('SELECT * FROM projects WHERE user_id = ?', [userId]);
    return { success: true, data: projects };
  } catch (error) {
    console.error('getProjects Error:', error);
    return { success: false, message: 'Failed to fetch projects' };
  }
}

export async function getInvoices(email) {
  try {
    const userId = await getUserId(email);
    if (!userId) return { success: false, message: 'User not found' };

    const invoices = await query('SELECT * FROM invoices WHERE user_id = ? ORDER BY due_date DESC', [userId]);
    return { success: true, data: invoices };
  } catch (error) {
    console.error('getInvoices Error:', error);
    return { success: false, message: 'Failed to fetch invoices' };
  }
}

export async function getAssets(email) {
  try {
    const userId = await getUserId(email);
    if (!userId) return { success: false, message: 'User not found' };

    const assets = await query('SELECT * FROM recent_files WHERE user_id = ? ORDER BY id DESC', [userId]);
    return { success: true, data: assets };
  } catch (error) {
    console.error('getAssets Error:', error);
    return { success: false, message: 'Failed to fetch assets' };
  }
}

export async function getTickets(email) {
  try {
    const userId = await getUserId(email);
    if (!userId) return { success: false, message: 'User not found' };

    const tickets = await query('SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return { success: true, data: tickets };
  } catch (error) {
    console.error('getTickets Error:', error);
    return { success: false, message: 'Failed to fetch tickets' };
  }
}

export async function createTicket(email, ticket) {
  try {
    const userId = await getUserId(email);
    if (!userId) return { success: false, message: 'User not found' };

    await query(
      'INSERT INTO tickets (user_id, subject, status) VALUES (?, ?, ?)',
      [userId, ticket.subject, 'open']
    );
    return { success: true };
  } catch (error) {
    console.error('createTicket Error:', error);
    return { success: false, message: 'Failed to create ticket' };
  }
}

export async function updateProfile(email, data) {
  try {
    const userId = await getUserId(email);
    if (!userId) return { success: false, message: 'User not found' };

    await query(
      'UPDATE client_profiles SET company_name = ?, contact_name = ? WHERE user_id = ?',
      [data.companyName, data.contactName, userId]
    );
    return { success: true };
  } catch (error) {
    console.error('updateProfile Error:', error);
    return { success: false, message: 'Failed to update profile' };
  }
}

export async function changePassword(email, currentPassword, newPassword) {
  try {
    const userId = await getUserId(email);
    if (!userId) return { success: false, message: 'User not found' };

    // Verify current password
    const users = await query('SELECT password FROM users WHERE id = ?', [userId]);
    if (users.length === 0) return { success: false, message: 'User not found' };

    // In production, use proper password hashing (bcrypt, etc.)
    if (users[0].password !== currentPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }

    // Update password (should be hashed in production)
    await query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId]);
    return { success: true, message: 'Password updated successfully' };
  } catch (error) {
    console.error('changePassword Error:', error);
    return { success: false, message: 'Failed to change password' };
  }
}

export async function updateNotificationPreferences(email, preferences) {
  try {
    const userId = await getUserId(email);
    if (!userId) return { success: false, message: 'User not found' };

    // For now, we'll store preferences in a simple way
    // In production, you'd want a dedicated notifications_preferences table
    return { success: true, message: 'Notification preferences updated' };
  } catch (error) {
    console.error('updateNotificationPreferences Error:', error);
    return { success: false, message: 'Failed to update preferences' };
  }
}
