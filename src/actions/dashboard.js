'use server'

import { query } from '../lib/db';

export async function getDashboardData(email) {
  if (!email) {
    return { success: false, message: 'Email is required' };
  }

  try {
    // 1. Get User
    const users = await query('SELECT id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return { success: false, message: 'User not found' };
    }
    const userId = users[0].id;

    // 2. Get Profile
    const profiles = await query('SELECT * FROM client_profiles WHERE user_id = ?', [userId]);
    const profile = profiles[0] || {};

    // 3. Get Dynamic Stats
    // Active Projects
    const projectsCount = await query('SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND status != ?', [userId, 'completed']);
    const activeProjects = projectsCount[0].count;

    // Total Spent (Sum of paid invoices)
    const spentResult = await query('SELECT SUM(amount) as total FROM invoices WHERE user_id = ? AND status = ?', [userId, 'paid']);
    const totalSpent = spentResult[0].total || 0;

    // Open Tickets
    const ticketsCount = await query('SELECT COUNT(*) as count FROM tickets WHERE user_id = ? AND status = ?', [userId, 'open']);
    const openTickets = ticketsCount[0].count;

    // Next Meeting
    const meetings = await query('SELECT meeting_date FROM meetings WHERE user_id = ? AND meeting_date > NOW() ORDER BY meeting_date ASC LIMIT 1', [userId]);
    let nextMeeting = 'No upcoming meetings';
    if (meetings.length > 0) {
      const date = new Date(meetings[0].meeting_date);
      nextMeeting = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    // 4. Get Files
    const recentFiles = await query('SELECT name, type FROM recent_files WHERE user_id = ?', [userId]);

    // 5. Get Current Project
    const projects = await query('SELECT * FROM projects WHERE user_id = ? LIMIT 1', [userId]);
    let currentProject = null;

    if (projects.length > 0) {
      const project = projects[0];
      const timeline = await query('SELECT label, status FROM project_timeline WHERE project_id = ?', [project.id]);
      
      currentProject = {
        title: project.title,
        progress: project.progress,
        status: project.status,
        timeline: timeline
      };
    }

    // Construct Response
    const data = {
      clientInfo: {
        name: profile.company_name || 'Unknown Corp',
        contact: profile.contact_name || 'Unknown',
        plan: profile.plan_type || 'Basic'
      },
      stats: {
        activeProjects: activeProjects,
        totalSpent: totalSpent,
        openTickets: openTickets,
        nextMeeting: nextMeeting
      },
      currentProject: currentProject || {
        title: "No Active Project",
        progress: 0,
        status: "N/A",
        timeline: []
      },
      recentFiles: recentFiles
    };

    return { success: true, data };

  } catch (error) {
    console.error('Dashboard Data Error:', error);
    return { success: false, message: 'Failed to fetch dashboard data' };
  }
}
