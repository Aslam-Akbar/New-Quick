# Quick Tech Solutions - Agency Website

## Overview
This is a Next.js web application for Quick Tech Solutions, a premium software development agency. The application serves as both a marketing website and a client portal.

**Project Type**: Next.js Frontend Application  
**Tech Stack**: Next.js 16, React 19, Tailwind CSS, MySQL (TiDB Cloud)  
**Last Updated**: November 21, 2025

## Purpose
- Showcase agency services (software development, mobile apps, cloud infrastructure, etc.)
- Provide company information and career opportunities
- Client portal for project management, invoices, and support tickets
- Admin dashboard for managing clients, projects, and job postings

## Project Architecture

### Directory Structure
- `/app` - Next.js app directory with route pages
  - `/admin` - Admin dashboard (protected and public routes)
  - `/client-portal` - Client dashboard
  - `/careers`, `/about`, `/contact`, etc. - Public pages
- `/src` - Source code
  - `/actions` - Server actions for data operations
  - `/components` - React components
  - `/lib` - Database connection utilities
  - `/data` - Mock data for development
- `/public` - Static assets
- `/build` - Legacy build artifacts (from CRA migration)

### Key Features
1. **Public Website**: Services, About, Contact, Careers pages
2. **Client Portal**: Login-protected dashboard with:
   - Project tracking with timelines
   - Invoice management
   - Asset downloads
   - Support ticket system
   - Profile settings
3. **Admin Dashboard**: 
   - Client management
   - Job posting management
   - Dashboard statistics
   - Protected routes with authentication

### Database
- **Type**: MySQL (TiDB Cloud hosted)
- **Connection**: Via mysql2 pool in `src/lib/db.js`
- **Tables**: users, client_profiles, projects, invoices, tickets, meetings, job_postings, admin_users
- **Setup Script**: `setup-dashboard-db.js` (creates schema and seeds data)

## Development Setup

### Running the Application
```bash
npm run dev
```
The application runs on http://0.0.0.0:5000 (configured for Replit environment)

### Environment Configuration
- **Port**: 5000 (required for Replit webview)
- **Host**: 0.0.0.0 (allows all hosts for Replit proxy)
- **Next.js Config**: Configured with `allowedDevOrigins: ['*']` for Replit compatibility

### Database Setup
The application connects to a pre-configured TiDB Cloud MySQL database. Connection details are in `src/lib/db.js`.

## Recent Changes

### November 21, 2025 - Page Styling Fixes
- **Fixed Unstyled Pages**:
  - Converted Privacy, Terms, Cookies, and Support pages from missing CSS files to Tailwind CSS
  - Removed broken CSS imports (`./assets/css/style.css`, `./assets/css/pages.css`)
  - Added Header and Footer components to all legal and support pages
  - Applied consistent dark theme (slate-900) with blue accents matching the rest of the site
  - All pages now properly styled and functional with no build errors

- **Import Migration Completed**:
  - Installed npm dependencies (removed react-helmet-async due to React 19 incompatibility)
  - Restarted workflow successfully
  - Verified all pages load and display correctly
  - Client Portal and Admin pages confirmed to have proper styling

### November 21, 2025 - Full Project Review & Fixes
- **Code Quality Improvements**:
  - Fixed duplicate console.error logging in src/lib/db.js
  - Removed legacy build directory from CRA migration
  - Verified all database connections working correctly
  
- **Testing & Validation**:
  - Tested all public pages (Home, Services, About, Careers, Contact, Process)
  - Verified client login functionality
  - Verified admin login functionality
  - Confirmed database connectivity and queries
  - All features working as expected

- **Documentation**:
  - Created comprehensive TESTING_GUIDE.md with test credentials
  - Updated README.md with full feature documentation
  - Added security notes and production recommendations
  - Documented all database tables and schema

- **Initial Replit Setup**:
  - Configured Next.js to run on port 5000 with host 0.0.0.0
  - Added `allowedDevOrigins: ['*']` to next.config.js for Replit proxy
  - Created .gitignore for Next.js project
  - Set up workflow for frontend development
  - Installed dependencies with --legacy-peer-deps flag
  - Configured deployment for autoscale

## Test Credentials

### Client Portal
- Email: `test@example.com`
- Password: `password123`
- URL: `/login`

### Admin Dashboard
- Email: `admin@quicks.com`
- Password: `admin123`
- URL: `/admin/login`

## User Preferences
None documented yet.

## Known Issues
- Minor hydration warnings on login/contact pages (non-critical, doesn't affect functionality)
- Using --legacy-peer-deps for installation due to react-helmet-async peer dependency conflict with React 19
- Security: Passwords stored in plain text (demo only - requires hashing for production)
- Security: Database credentials hardcoded (should use environment variables in production)
