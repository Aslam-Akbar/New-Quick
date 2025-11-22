'use server'

import { query } from '../lib/db';
import { revalidatePath } from 'next/cache';

export async function getClientTickets(clientId) {
  try {
    const tickets = await query(`
      SELECT t.* 
      FROM tickets t
      JOIN client_profiles cp ON t.user_id = cp.user_id
      WHERE cp.id = ?
      ORDER BY t.created_at DESC
    `, [clientId]);

    return tickets.map(t => ({
      ...t,
      created_at: t.created_at ? new Date(t.created_at).toLocaleDateString() : 'N/A'
    }));
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return [];
  }
}

export async function closeTicket(ticketId) {
  try {
    // 1. Get the client ID (profile id) first so we know which page to refresh
    const ticket = await query(`
      SELECT cp.id as client_id 
      FROM tickets t
      JOIN client_profiles cp ON t.user_id = cp.user_id
      WHERE t.id = ?
    `, [ticketId]);
    
    // 2. Update Status
    await query('UPDATE tickets SET status = "Closed" WHERE id = ?', [ticketId]);

    // 3. Refresh the UI
    if (ticket.length > 0) {
        revalidatePath(`/admin/clients/${ticket[0].client_id}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error closing ticket:', error);
    return { success: false, error: error.message };
  }
}