'use server'

import { query } from '../lib/db';
import { revalidatePath } from 'next/cache';
import { createInvoice } from './admin-invoices';

function validateURL(url) {
  if (!url) return true;
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
}

function formatDateTimeForDB(dateTimeLocal) {
  if (!dateTimeLocal) return null;
  const formatted = dateTimeLocal.replace('T', ' ') + ':00';
  return formatted;
}

export async function getClientProjects(clientId) {
  try {
    const projects = await query(`
      SELECT p.* 
      FROM projects p
      JOIN client_profiles cp ON p.user_id = cp.user_id
      WHERE cp.id = ?
      ORDER BY p.due_date ASC
    `, [clientId]);
    return projects;
  } catch (error) {
    return [];
  }
}

export async function createProject(clientId, data) {
  try {
    console.log('Creating project for client:', clientId, 'Data:', data);
    
    if (data.progress < 0 || data.progress > 100) {
      return { success: false, error: 'Progress must be between 0 and 100' };
    }
    
    if (data.hosted_url && !validateURL(data.hosted_url)) {
      return { success: false, error: 'Invalid Live Website URL' };
    }
    
    if (data.github_url && !validateURL(data.github_url)) {
      return { success: false, error: 'Invalid GitHub URL' };
    }
    
    const clients = await query('SELECT user_id FROM client_profiles WHERE id = ?', [clientId]);
    if (clients.length === 0) {
        console.error('Client not found for ID:', clientId);
        return { success: false, error: 'Client not found' };
    }
    
    const userId = clients[0].user_id;
    const formattedNextMeeting = formatDateTimeForDB(data.next_meeting);

    await query(
      'INSERT INTO projects (user_id, name, status, progress, due_date, hosted_url, github_url, next_meeting) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        userId, 
        data.name, 
        data.status, 
        data.progress, 
        data.due_date, 
        data.hosted_url || null,
        data.github_url || null,
        formattedNextMeeting
      ]
    );

    console.log('Advance Amount Check:', data.advanceAmount);
    if (data.advanceAmount && Number(data.advanceAmount) > 0) {
        console.log('Creating invoice for advance amount...');
        const invoiceResult = await createInvoice(clientId, {
            amount: data.advanceAmount,
            currency: 'INR',
            status: 'Unpaid',
            date: new Date().toISOString().split('T')[0],
            due_date: data.due_date,
            description: `Advance for project: ${data.name}`
        });
        console.log('Invoice Creation Result:', invoiceResult);
    } else {
        console.log('No advance amount provided or amount is 0');
    }

    revalidatePath(`/admin/clients/${clientId}`);
    return { success: true };
  } catch (error) {
    console.error('Create Project Error:', error);
    return { success: false, error: error.message };
  }
}

export async function updateProject(projectId, data) {
  try {
    if (data.progress !== undefined && (data.progress < 0 || data.progress > 100)) {
      return { success: false, error: 'Progress must be between 0 and 100' };
    }
    
    if (data.hosted_url !== undefined && data.hosted_url && !validateURL(data.hosted_url)) {
      return { success: false, error: 'Invalid Live Website URL' };
    }
    
    if (data.github_url !== undefined && data.github_url && !validateURL(data.github_url)) {
      return { success: false, error: 'Invalid GitHub URL' };
    }
    
    const project = await query(`
      SELECT cp.id as client_id 
      FROM projects p
      JOIN client_profiles cp ON p.user_id = cp.user_id
      WHERE p.id = ?
    `, [projectId]);

    if (!project.length) return { success: false, error: 'Project not found' };

    const fields = [];
    const values = [];

    if (data.name !== undefined) { fields.push('name = ?'); values.push(data.name); }
    if (data.status !== undefined) { fields.push('status = ?'); values.push(data.status); }
    if (data.progress !== undefined) { fields.push('progress = ?'); values.push(data.progress); }
    if (data.due_date !== undefined) { fields.push('due_date = ?'); values.push(data.due_date); }
    if (data.hosted_url !== undefined) { fields.push('hosted_url = ?'); values.push(data.hosted_url); }
    if (data.github_url !== undefined) { fields.push('github_url = ?'); values.push(data.github_url); }
    if (data.next_meeting !== undefined) { 
      const formattedNextMeeting = formatDateTimeForDB(data.next_meeting);
      fields.push('next_meeting = ?'); 
      values.push(formattedNextMeeting); 
    }
    
    fields.push('updated_at = CURRENT_TIMESTAMP');

    if (fields.length > 0) {
        values.push(projectId);
        await query(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`, values);
    }
    
    revalidatePath(`/admin/clients/${project[0].client_id}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteProject(projectId) {
  try {
    const project = await query(`
      SELECT cp.id as client_id 
      FROM projects p
      JOIN client_profiles cp ON p.user_id = cp.user_id
      WHERE p.id = ?
    `, [projectId]);

    await query('DELETE FROM projects WHERE id = ?', [projectId]);
    
    if (project.length > 0) {
        revalidatePath(`/admin/clients/${project[0].client_id}`);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
