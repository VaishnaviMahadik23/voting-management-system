---

# VoteSecure — Voting Management System

A modern, secure, responsive Voting Management System built as a
full-stack web application. Designed for educational institutions
to manage elections, candidates, voters, and results.

## Features

- Secure role-based authentication (Admin / Voter)
- Admin dashboard with real-time analytics
- Election lifecycle management (Draft → Upcoming → Ongoing → Completed)
- Candidate management with photo, party, biography, manifesto
- Voter registration and verification workflow
- One-vote-per-election enforcement (frontend + database level)
- Vote confirmation modal with warning
- Real-time charts using Recharts (Line, Bar, Pie/Donut)
- Audit logs for all system actions
- Notifications center (unread count, mark as read)
- Reports with export options (PDF / CSV)
- Fully responsive design — desktop, tablet, mobile

## Technology Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 19, Vite 8, TypeScript 5.7  |
| Styling   | Tailwind CSS v4                   |
| Routing   | React Router v7                   |
| Charts    | Recharts                          |
| Icons     | Lucide React                      |
| Fonts     | Outfit + Inter (Google Fonts)     |

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm (or npm)

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/voting-management-system.git
cd voting-management-system
pnpm install
pnpm dev
```

The app runs on http://localhost:8443 (or the PORT set by the environment).

## Demo Credentials

| Role  | Email                      | Password   |
|-------|----------------------------|------------|
| Admin | admin@votesecure.com       | Admin@123  |
| Voter | vaishnavi@student.edu      | Voter@123  |

⚠️ Change these credentials before deploying to production.

## Project Structure

```
src/
├── components/ui/      # Reusable UI: Modal, Toast, Badge, ConfirmDialog
├── context/            # AuthContext
├── data/               # Mock data (replace with API calls in production)
├── layouts/            # AdminLayout, VoterLayout (sidebar + header)
├── pages/
│   ├── auth/           # Splash, Login, Register, ForgotPassword
│   ├── admin/          # All admin pages (12 pages)
│   └── voter/          # All voter pages (10 pages)
└── App.tsx             # Router with protected routes
```

## License

MIT — free to use for educational and personal projects.

---
