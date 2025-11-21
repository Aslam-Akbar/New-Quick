'use server'

import { query } from '../lib/db';

export async function getAdminDashboardStats() {
  try {
    const clients = await query('SELECT COUNT(*) as count FROM client_profiles');
    const projects = await query('SELECT COUNT(*) as count FROM projects WHERE status = "In Progress"');
    const invoices = await query('SELECT COUNT(*) as count FROM invoices WHERE status = "paid"');
    const tickets = await query('SELECT COUNT(*) as count FROM tickets WHERE status = "open"');

    return {
      clients: clients[0].count,
      projects: projects[0].count,
      invoices: invoices[0].count,
      tickets: tickets[0].count
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return { clients: 0, projects: 0, invoices: 0, tickets: 0 };
  }
}
