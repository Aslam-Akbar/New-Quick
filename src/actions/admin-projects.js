'use server'

import { query } from '../lib/db';
import { revalidatePath } from 'next/cache';

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
    // Get user_id from client_profiles
    const clients = await query('SELECT user_id FROM client_profiles WHERE id = ?', [clientId]);
    if (clients.length === 0) return { success: false, error: 'Client not found' };
    
    const userId = clients[0].user_id;

    await query(
      'INSERT INTO projects (user_id, name, status, progress, due_date) VALUES (?, ?, ?, ?, ?)',
      [userId, data.name, data.status, data.progress, data.due_date]
    );
    revalidatePath(`/admin/clients/${clientId}`);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteProject(projectId) {
  try {
    // Get client id for revalidation before deleting
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