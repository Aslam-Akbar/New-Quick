# Quick Tech Solutions - Premium Software Agency Website

A full-stack Next.js application featuring a public marketing website, client portal, and admin dashboard for a software development agency.

## 🚀 Quick Start

### Running the Application

```bash
npm install --legacy-peer-deps
npm run dev
```

The application will be available at `http://localhost:5000`

### Test Credentials

**Client Portal:**
- Email: `test@example.com`
- Password: `password123`

**Admin Dashboard:**
- Email: `admin@quicks.com`
- Password: `admin123`

## 📋 Features

### Public Website
- **Homepage** - Modern hero section with agency branding
- **Services** - Comprehensive service offerings showcase
- **About** - Company mission, values, and team statistics
- **Careers** - Job listings with company benefits
- **Process** - Agile development workflow visualization
- **Contact** - Multi-channel contact information and form

### Client Portal (`/client-portal`)
Secure dashboard for clients to:
- View active projects and timelines
- Track invoices and payment status
- Download project assets and deliverables
- Create and manage support tickets
- Update profile and notification preferences

### Admin Dashboard (`/admin`)
Comprehensive admin panel featuring:
- Real-time statistics dashboard
- Client management and profiles
- Job posting creation and management
- Invoice tracking and management
- Support ticket monitoring

## 🛠 Tech Stack

- **Frontend**: Next.js 16, React 19
- **Styling**: Tailwind CSS 4
- **Database**: MySQL (TiDB Cloud)
- **Icons**: React Icons, Lucide React
- **Deployment**: Replit (Development), Autoscale (Production)

## 📁 Project Structure

```
quick-tech-solutions/
├── app/                      # Next.js app directory
│   ├── admin/               # Admin dashboard routes
│   │   ├── (protected)/     # Protected admin pages
│   │   └── (public)/        # Public admin pages (login)
│   ├── client-portal/       # Client dashboard
│   ├── about/               # About page
│   ├── careers/             # Careers page
│   ├── contact/             # Contact page
│   ├── services/            # Services page
│   └── ...                  # Other public pages
├── src/
│   ├── actions/             # Server actions
│   │   ├── auth.js          # Client authentication
│   │   ├── admin-auth.js    # Admin authentication
│   │   ├── portal.js        # Client portal actions
│   │   └── admin-*.js       # Admin-specific actions
│   ├── components/          # React components
│   │   ├── admin/           # Admin-specific components
│   │   ├── portal-views/    # Client portal views
│   │   └── *.js             # Shared components
│   ├── lib/
│   │   └── db.js            # Database connection pool
│   └── data/                # Mock data (if needed)
├── public/                  # Static assets
├── setup-dashboard-db.js    # Database setup script
└── package.json
```

## 🗄 Database Schema

### Core Tables
- **users** - Client user accounts
- **admin_users** - Admin accounts
- **client_profiles** - Extended client information
- **projects** - Client projects with progress tracking
- **project_timeline** - Project milestone events
- **invoices** - Billing and payment records
- **tickets** - Support ticket system
- **ticket_replies** - Ticket conversation threads
- **meetings** - Scheduled client meetings
- **job_postings** - Career page listings

### Setup Database
To initialize the database with sample data:

```bash
node setup-dashboard-db.js
```

## 🔒 Security Notes

⚠️ **This is a demonstration application** ⚠️

**Current implementation includes:**
- Plain text passwords (NOT production-ready)
- Hardcoded database credentials
- Basic cookie-based authentication
- No rate limiting

**For production use, implement:**
- Password hashing (bcrypt, argon2)
- Environment variables for secrets
- JWT tokens or session management
- HTTPS enforcement
- Rate limiting on authentication
- Input validation and sanitization
- CSRF protection
- Security headers

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Dark**: Slate (#0f172a, #1e293b)
- **Accent**: Violet, Emerald, Yellow

### Components
- Modern glassmorphism effects
- Smooth transitions and hover effects
- Responsive grid layouts
- Accessible form inputs

## 📱 Responsive Design

Fully responsive design with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🧪 Testing

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing instructions.

### Quick Test
1. Navigate to `/login` and use client credentials
2. Explore client portal features
3. Navigate to `/admin/login` and use admin credentials
4. Test admin dashboard functionality

## 📝 Development

### Scripts

```bash
npm run dev      # Start development server on port 5000
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Environment Configuration

The application is configured for Replit:
- Host: `0.0.0.0` (allows proxy access)
- Port: `5000` (webview port)
- Allowed origins: `*` (for development)

## 🚢 Deployment

Configured for Replit autoscale deployment:
- Build: `npm run build`
- Start: `npm start`
- Auto-scaling based on traffic
- Production-ready build optimization

## 🐛 Known Issues

1. Hydration warnings on login/contact pages (non-critical)
2. Dependency peer conflicts resolved with `--legacy-peer-deps`
3. Next.js 16 experimental features in use

## 📚 Documentation

- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Comprehensive testing guide
- [replit.md](./replit.md) - Project configuration and memory

## 🤝 Contributing

This is a demonstration project. For production use:
1. Implement proper security measures
2. Add comprehensive error handling
3. Set up logging and monitoring
4. Add automated testing
5. Configure CI/CD pipeline

## 📄 License

This is a demonstration project for educational purposes.

## 🔗 Live Demo

The application is running on Replit. Use the test credentials above to explore the features.

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**
