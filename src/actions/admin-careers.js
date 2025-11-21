'use server'

import { query } from '../lib/db';

export async function getJobPostings() {
  try {
    const jobs = await query('SELECT * FROM job_postings ORDER BY created_at DESC');
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export async function createJobPosting(data) {
  try {
    const { title, type, location, department, description } = data;
    await query(
      'INSERT INTO job_postings (title, type, location, department, description) VALUES (?, ?, ?, ?, ?)',
      [title, type, location, department, description]
    );
    return { success: true };
  } catch (error) {
    console.error('Error creating job:', error);
    return { success: false, error: 'Failed to create job posting' };
  }
}

export async function toggleJobStatus(id, currentStatus) {
  try {
    const newStatus = currentStatus === 'active' ? 'closed' : 'active';
    await query('UPDATE job_postings SET status = ? WHERE id = ?', [newStatus, id]);
    return { success: true };
  } catch (error) {
    console.error('Error updating job status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}
