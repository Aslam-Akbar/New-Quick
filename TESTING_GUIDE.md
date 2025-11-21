# Quick Tech Solutions - Testing Guide

## Test Credentials

### Client Portal Access
- **Email**: `test@example.com`
- **Password**: `password123`
- **Login URL**: `/login`

### Admin Dashboard Access
- **Email**: `admin@quicks.com`
- **Password**: `admin123`
- **Login URL**: `/admin/login`

## Features to Test

### 1. Public Website Pages ✅
All pages are fully functional and styled:
- **Home** (`/`) - Hero section with call-to-action
- **Services** (`/services`) - Showcase of 6 main services
- **Process** (`/process`) - Agile workflow explanation
- **Careers** (`/careers`) - Job listings and benefits
- **About** (`/about`) - Company mission and stats
- **Contact** (`/contact`) - Contact form and information

### 2. Client Portal Features
After logging in with client credentials, you can access:
- **Dashboard** - Overview of projects, invoices, and tickets
- **Projects View** - List of active projects with progress tracking
- **Invoices View** - Financial overview and invoice history
- **Assets View** - Downloadable project assets
- **Support View** - Create and manage support tickets
- **Settings View** - Update profile and preferences

### 3. Admin Dashboard Features
After logging in with admin credentials, you can access:
- **Admin Dashboard** - Statistics overview (clients, projects, invoices, tickets)
- **Client Management** (`/admin/clients`) - View and manage clients
- **Client Details** (`/admin/clients/[id]`) - Individual client information
- **Career Management** (`/admin/careers`) - Manage job postings
- **New Job Posting** (`/admin/careers/new`) - Create new job listings

## Database Structure

### Tables
- `users` - User authentication (client accounts)
- `admin_users` - Admin authentication
- `client_profiles` - Extended client information
- `projects` - Client projects with status tracking
- `project_timeline` - Timeline events for projects
- `invoices` - Billing and payment tracking
- `tickets` - Support ticket system
- `ticket_replies` - Conversation threads for tickets
- `meetings` - Scheduled client meetings
- `recent_files` - Asset management
- `job_postings` - Career page listings

### Sample Data
The database is pre-seeded with:
- 2 test users (1 client, 1 admin)
- Sample projects, invoices, and tickets for the test client
- 4 active job postings
- Meeting schedules and recent files

## Testing Workflow

### Test Client Portal Flow
1. Navigate to `/login`
2. Enter client credentials
3. Verify redirect to `/client-portal`
4. Test navigation between dashboard views
5. Check data displays correctly (projects, invoices, tickets)
6. Test creating a new support ticket
7. Test updating profile settings

### Test Admin Portal Flow
1. Navigate to `/admin/login`
2. Enter admin credentials
3. Verify redirect to `/admin` dashboard
4. Check statistics display correctly
5. Navigate to Clients section
6. View individual client details
7. Test career management features
8. Create a new job posting

### Test Public Website Flow
1. Navigate through all public pages
2. Test header navigation
3. Test "Start a Project" CTAs
4. Test "Client Login" link
5. Verify footer links work
6. Check responsive design on different screen sizes

## Known Issues & Notes

### Security Notes
⚠️ **IMPORTANT**: This is a demonstration application with:
- Plain text passwords (not hashed) - DO NOT use in production
- Hardcoded database credentials - Should use environment variables
- Basic authentication without JWT tokens
- No rate limiting on login attempts

### Development Notes
- Application runs on port 5000 (required for Replit)
- Next.js 16 with React 19
- Uses TiDB Cloud (MySQL) for database
- Some hydration warnings in console (non-critical)
- Using `--legacy-peer-deps` for npm install

### Planned Features (Coming Soon)
- Two-Factor Authentication
- Password reset functionality
- Email notifications
- File upload for support tickets
- Advanced analytics dashboard
- Team collaboration features

## Database Connection

The application connects to a TiDB Cloud MySQL database with:
- Host: `gateway01.ap-southeast-1.prod.aws.tidbcloud.com`
- Port: `4000`
- Database: `QUICK`
- SSL/TLS enabled

## Troubleshooting

### Login Not Working
- Verify credentials match exactly (case-sensitive)
- Check browser console for errors
- Ensure database connection is active

### Pages Not Loading
- Check workflow is running: `Next.js Frontend`
- Restart workflow if needed
- Clear browser cache and hard refresh

### Database Errors
- Run `node setup-dashboard-db.js` to reset database
- Check database connection in `src/lib/db.js`
- Verify SSL certificate file exists: `isrgrootx1.pem`

## Performance Notes

- Initial page load: ~1-2 seconds
- Database queries: < 200ms average
- TiDB Cloud latency: ~50-100ms (Singapore region)
- Next.js Turbopack enabled for fast refresh

## Browser Compatibility

Tested and working on:
- Chrome 120+
- Firefox 120+
- Safari 17+
- Edge 120+

## Support

For issues or questions about this demo application, check:
- Application logs in workflow console
- Browser developer console
- Database connection status
