'use server'

import { query } from '../lib/db';

export async function getPublicJobPostings() {
  try {
    const jobs = await query('SELECT * FROM job_postings WHERE status = "active" ORDER BY created_at DESC');
    return jobs;
  } catch (error) {
    console.error('Error fetching public jobs:', error);
    return [];
  }
}
