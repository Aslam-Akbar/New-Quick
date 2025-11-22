'use server'

import { query } from '../lib/db';
import { revalidatePath } from 'next/cache';

export async function getClientInvoices(clientId) {
  try {
    const invoices = await query(`
      SELECT i.* 
      FROM invoices i
      JOIN client_profiles cp ON i.user_id = cp.user_id
      WHERE cp.id = ?
      ORDER BY i.date DESC
    `, [clientId]);

    // Format dates for the UI
    return invoices.map(inv => ({
      ...inv,
      date: inv.date ? new Date(inv.date).toISOString().split('T')[0] : null,
      due_date: inv.due_date ? new Date(inv.due_date).toISOString().split('T')[0] : null
    }));
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
}

/**
 * Creates a new invoice and links it to the specific client.
 * @param {string|number} clientId 
 * @param {Object} data 
 */
export async function createInvoice(clientId, data) {
  try {
    console.log('createInvoice called for client:', clientId, 'Data:', data);
    // Input Validation
    if (!data.amount || !data.date || !data.due_date) {
      console.error('Missing required fields in createInvoice');
      return { success: false, error: 'Missing required fields' };
    }

    // 1. Get the owner (user_id) of the client profile
    const clientData = await query(
        'SELECT user_id FROM client_profiles WHERE id = ?', 
        [clientId]
    );
    
    if (!clientData || clientData.length === 0) {
        console.error('Client not found in createInvoice');
        return { success: false, error: 'Client not found' };
    }
    
    const userId = clientData[0].user_id;
    console.log('Found userId:', userId);

    // 2. Insert Data
    const result = await query(
      `INSERT INTO invoices 
      (user_id, amount, currency, status, date, due_date, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [
        userId, 
        data.amount, 
        data.currency || 'INR', 
        data.status || 'Pending', 
        data.date, 
        data.due_date,
        data.description || '' 
      ]
    );
    console.log('Invoice inserted, result:', result);

    // 3. Revalidate Cache
    try {
        revalidatePath(`/clients/${clientId}`); 
    } catch (e) {
        console.warn('revalidatePath failed (expected in script):', e);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error creating invoice:', error);
    return { success: false, error: error.message || 'Database error' };
  }
}

/**
 * Updates the status of an invoice.
 * @param {string|number} invoiceId 
 */
export async function markInvoicePaid(invoiceId) {
  try {
    // Get the client_id (profile id) first to know which page to refresh
    // We need to join to get the client_profile id from the invoice's user_id
    const invoice = await query(`
      SELECT cp.id as client_id 
      FROM invoices i
      JOIN client_profiles cp ON i.user_id = cp.user_id
      WHERE i.id = ?
    `, [invoiceId]);
    
    if (!invoice.length) return { success: false, error: 'Invoice not found' };

    await query('UPDATE invoices SET status = "Paid" WHERE id = ?', [invoiceId]);
    
    // Refresh the specific client's page
    revalidatePath(`/clients/${invoice[0].client_id}`);

    return { success: true };
  } catch (error) {
    console.error('Error updating invoice:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Deletes an invoice.
 * @param {string|number} invoiceId 
 */
export async function deleteInvoice(invoiceId) {
  try {
    // Get client_id first to know which page to refresh
    const invoice = await query(`
      SELECT cp.id as client_id 
      FROM invoices i
      JOIN client_profiles cp ON i.user_id = cp.user_id
      WHERE i.id = ?
    `, [invoiceId]);

    if (!invoice.length) return { success: false, error: 'Invoice not found' };

    await query('DELETE FROM invoices WHERE id = ?', [invoiceId]);
    
    // Refresh the specific client's page
    revalidatePath(`/clients/${invoice[0].client_id}`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return { success: false, error: error.message };
  }
}