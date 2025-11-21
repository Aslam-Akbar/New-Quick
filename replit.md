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
- **Nov 21, 2025**: Initial Replit setup
  - Configured Next.js to run on port 5000 with host 0.0.0.0
  - Added `allowedDevOrigins: ['*']` to next.config.js for Replit proxy
  - Created .gitignore for Next.js project
  - Set up workflow for frontend development
  - Installed dependencies with --legacy-peer-deps flag

## User Preferences
None documented yet.

## Known Issues
- Some dependency warnings due to React 19 compatibility
- Using --legacy-peer-deps for installation due to react-helmet-async peer dependency conflict
- Old build directory from Create React App migration can be removed if needed
