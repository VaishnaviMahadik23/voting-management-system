# Voting Management System — Full-Stack Web Application

Build a modern, secure, responsive **Voting Management System** as a complete full-stack web application.

The application should allow an administrator to create and manage elections, voters, candidates, and election results. Registered voters should be able to securely log in, view active elections, see candidates, cast their vote only once, and view results when the election is completed.

The application must have a professional, modern, clean UI suitable for a college/final-year project and should be designed so that it can later be deployed to production.

---

## 1. Project Goal

Create a web-based Voting Management System that provides:

* Secure user authentication
* Role-based access control
* Admin management
* Voter registration and verification
* Election creation and management
* Candidate management
* Secure voting
* One-vote-per-election restriction
* Vote counting
* Election results
* Reports and analytics
* Audit logs
* Notifications
* User profile and settings
* Responsive design for desktop, tablet, and mobile

The system should have two main roles:

### Admin

Admin can manage the entire voting system.

### Voter

Voter can register/login, view eligible elections, view candidates, cast votes, and view permitted results.

---

# 2. Recommended Technology Stack

Use the following stack unless there is a strong technical reason to change it:

### Frontend

* React
* Vite
* JavaScript or TypeScript
* React Router
* Tailwind CSS
* Axios
* Recharts for analytics/charts
* Lucide React for icons

### Backend

* Node.js
* Express.js
* REST API
* JWT authentication
* bcrypt/bcryptjs for password hashing
* express-validator or Zod for validation
* Helmet
* CORS
* Rate limiting

### Database

Use PostgreSQL.

Use:

* PostgreSQL
* Prisma ORM or Sequelize

Prefer Prisma if possible because it provides a clean schema and migrations.

### Development

Use:

* Git
* GitHub
* Environment variables
* ESLint
* Prettier

---

# 3. Project Structure

Create a clean project structure:

```text
voting-management-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── assets/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── models/
│   │   ├── validators/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── package.json
│
├── README.md
├── .gitignore
└── .env.example
```

Keep frontend and backend clearly separated.

---

# 4. UI/UX Design

Create a modern professional UI.

### Primary design

Use:

* White/light background
* Deep navy or dark blue
* Purple/indigo primary accent
* Green for success
* Red for errors/danger
* Orange/yellow for warnings
* Rounded cards
* Soft shadows
* Clean typography
* Consistent spacing
* Modern icons
* Responsive layouts

Avoid excessive gradients and unnecessary animations.

The application should feel like a professional SaaS/admin dashboard rather than a basic college project.

---

# 5. Main Navigation

### Admin Sidebar

The admin dashboard should contain:

```text
Dashboard
Elections
Candidates
Voters
Results
Reports
Users
Notifications
Audit Logs
Settings
Admin Profile
Logout
```

### Voter Navigation

```text
Home
Active Elections
My Votes
Results
Notifications
Profile
Settings
Logout
```

---

# 6. Authentication Pages

Create the following pages:

## Splash / Welcome Page

Display:

* Voting Management System logo
* Short description
* Login button
* Register button
* Professional voting illustration

Text:

"Secure. Transparent. Reliable."

---

## Login Page

Fields:

* Email
* Password

Features:

* Show/hide password
* Remember me
* Forgot password
* Login button
* Register link
* Form validation
* Loading state
* Error messages

After successful login:

* Admin → Admin Dashboard
* Voter → Voter Dashboard

---

## Registration Page

Fields:

* Full name
* Email
* Mobile number
* Date of birth
* Voter ID
* Password
* Confirm password

Include:

* Password strength indicator
* Terms and conditions checkbox
* Register button
* Login link

Validate all fields.

---

## Forgot Password

Create:

1. Enter email
2. Verification/OTP screen
3. New password
4. Confirm password
5. Success screen

---

# 7. Admin Dashboard

Create a professional analytics dashboard.

Top cards:

```text
Total Elections
Total Voters
Total Candidates
Total Votes Cast
```

Add charts:

### Votes Overview

Line chart showing votes over time.

### Election Status

Donut/pie chart:

* Upcoming
* Ongoing
* Completed

### Recent Elections

Show:

* Election name
* Start date
* End date
* Candidates
* Status
* Actions

### Recent Activity

Examples:

```text
New voter registered
Candidate added
Election created
Election completed
Results published
```

---

# 8. Election Management

Create an Elections page.

Features:

* Search elections
* Filter by status
* Sort
* Pagination
* Create election
* View election
* Edit election
* Delete/cancel election
* Publish results

Election statuses:

```text
Draft
Upcoming
Ongoing
Completed
Cancelled
```

---

# 9. Create Election Page

Fields:

* Election name
* Election type
* Description
* Start date
* Start time
* End date
* End time
* Eligible voter category
* Election rules
* Allow voter registration
* Automatically publish results

Election types can include:

```text
Student Council
College Election
Class Representative
Club Election
Organization Election
Other
```

Before creating the election, display a confirmation dialog.

---

# 10. Election Details Page

Display:

* Election name
* Description
* Election status
* Start date
* End date
* Number of voters
* Number of candidates
* Votes cast
* Voter turnout

Tabs:

```text
Overview
Candidates
Voters
Votes
Results
Activity
```

---

# 11. Candidate Management

Create a Candidates page.

Display candidate cards/table with:

* Candidate photo
* Candidate name
* Position
* Party/group
* Description
* Election
* Status
* Vote count
* Edit
* Delete

Add candidate form:

```text
Candidate Name
Photo
Election
Position
Party / Group
Symbol
Biography
Manifesto
Status
```

Candidate status:

```text
Active
Inactive
Disqualified
```

---

# 12. Voter Management

Create a Voters page.

Display:

* Voter ID
* Name
* Email
* Mobile
* Election eligibility
* Verification status
* Registration date
* Voting status

Features:

* Search
* Filter
* Pagination
* Verify voter
* Suspend voter
* View voter
* Edit voter
* Delete voter

Verification statuses:

```text
Pending
Verified
Rejected
Suspended
```

---

# 13. Voter Dashboard

After login, voters should see:

### Welcome section

Example:

"Welcome back, Vaishnavi"

### Active Elections

Each card should show:

* Election name
* Election description
* Start date
* End date
* Number of candidates
* Voting status

Buttons:

```text
View Election
Vote Now
```

---

# 14. Election Candidate Page

When a voter opens an election, display:

* Election title
* Election description
* Start/end date
* Rules
* Candidate list

Candidate cards should contain:

* Candidate photo
* Name
* Position
* Party/group
* Short biography
* Manifesto
* View Profile

Button:

```text
Proceed to Vote
```

---

# 15. Voting Page

Create a simple and extremely clear voting interface.

Display:

```text
Student Council Election

Select one candidate
```

Each candidate should have:

* Radio button
* Photo
* Name
* Position
* Party/group
* Short description

The voter must select a candidate before continuing.

Button:

```text
Continue
```

---

# 16. Vote Confirmation Page

Before submitting a vote, show:

```text
Confirm Your Vote

You selected:

Candidate Name
Position
Election Name
```

Warning:

"Once your vote is submitted, it cannot be changed."

Buttons:

```text
Go Back
Confirm Vote
```

Use a confirmation modal before final submission.

---

# 17. Vote Submitted Page

After successful voting:

Show a large success icon.

Message:

"Your vote has been submitted successfully."

Display:

* Election name
* Voting date/time
* Vote reference number

Do NOT display sensitive information that could reveal the voter's choice if the system is intended to maintain ballot secrecy.

Buttons:

```text
Back to Dashboard
View My Elections
```

---

# 18. Prevent Multiple Voting

A voter must never be able to vote twice in the same election.

Implement this at BOTH:

### Frontend

Disable the Vote button if the voter has already voted.

### Backend

Always verify whether a vote already exists before accepting a vote.

The database should enforce a unique constraint such as:

```text
voter_id + election_id
```

This backend/database protection is mandatory.

---

# 19. Results Page

Create a Results Dashboard.

Display:

```text
Election
Total Votes
Eligible Voters
Voter Turnout
```

Show:

* Candidate vote counts
* Percentages
* Ranking
* Winner
* Charts

Use:

* Bar charts
* Donut charts
* Progress bars

Results should only become visible according to the election's result-publication configuration.

---

# 20. Reports Page

Create reports for:

### Voter Turnout Report

Display:

```text
Eligible voters
Registered voters
Votes cast
Turnout percentage
```

### Election Results Report

Display:

* Candidate
* Votes
* Percentage
* Ranking

### Election Summary

Display:

* Election duration
* Total voters
* Candidates
* Votes
* Turnout
* Winner

Provide buttons:

```text
Generate Report
Download PDF
Export CSV
```

---

# 21. User Profile

Create profile page.

Display:

* Profile photo
* Full name
* Email
* Mobile
* Voter ID
* Date of birth
* Account status
* Registration date

Buttons:

```text
Edit Profile
Change Password
```

---

# 22. Settings

Create settings page with:

### Account Settings

* Name
* Email
* Mobile

### Security

* Change password
* Two-factor authentication option

### Notifications

* Email notifications
* Election reminders
* Result notifications

### Privacy

* Privacy preferences

---

# 23. Admin Profile

Admin profile should show:

```text
Admin name
Email
Role
Permissions
Account creation date
Last login
```

Role:

```text
System Administrator
```

---

# 24. Audit Logs

Create an Audit Logs page.

Track important actions:

```text
User registered
User verified
Election created
Election updated
Candidate added
Candidate removed
Election started
Vote submitted
Election completed
Results published
Admin login
```

Display:

* Action
* User
* IP address where appropriate
* Date
* Time
* Description

Provide search and filters.

---

# 25. Notifications

Create notification center.

Examples:

```text
Election registration opened
Election starts tomorrow
Voting is now open
Your vote was successfully recorded
Election has ended
Results have been published
```

Use:

* Notification icon
* Unread count
* Notification dropdown
* Mark as read
* Mark all as read

---

# 26. Database Design

Create a normalized PostgreSQL database.

Main tables:

```text
users
roles
voters
elections
candidates
positions
votes
election_voters
notifications
audit_logs
password_resets
```

Suggested relationships:

```text
User
 └── Voter

Election
 ├── Candidates
 ├── Eligible Voters
 └── Votes

Candidate
 └── Election

Vote
 ├── Voter
 ├── Election
 └── Candidate
```

Use foreign keys and appropriate indexes.

Important constraint:

```text
A voter can cast only one vote per election.
```

---

# 27. Authentication & Authorization

Implement JWT authentication.

JWT should contain:

```text
userId
role
```

Protect private routes using authentication middleware.

Create role-based middleware:

```text
requireAuth
requireAdmin
requireVoter
```

Admin-only APIs must never be accessible by voters.

Do not store plain-text passwords.

Use bcrypt/bcryptjs.

---

# 28. API Structure

Create REST APIs such as:

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me
```

### Elections

```text
GET    /api/elections
GET    /api/elections/:id
POST   /api/elections
PUT    /api/elections/:id
DELETE /api/elections/:id
```

### Candidates

```text
GET    /api/candidates
GET    /api/candidates/:id
POST   /api/candidates
PUT    /api/candidates/:id
DELETE /api/candidates/:id
```

### Voters

```text
GET    /api/voters
GET    /api/voters/:id
PUT    /api/voters/:id
DELETE /api/voters/:id
```

### Voting

```text
POST /api/votes
GET  /api/votes/my-votes
GET  /api/elections/:id/vote-status
```

### Results

```text
GET /api/elections/:id/results
```

### Reports

```text
GET /api/reports/turnout/:electionId
GET /api/reports/results/:electionId
```

### Audit Logs

```text
GET /api/audit-logs
```

---

# 29. Security Requirements

Security is extremely important.

Implement:

* Password hashing
* JWT authentication
* Role-based authorization
* Input validation
* SQL injection protection through ORM
* XSS protection
* CORS configuration
* Helmet
* Rate limiting
* Secure environment variables
* No secrets in Git
* Proper error handling
* Database constraints
* Duplicate vote prevention
* Authentication middleware
* Authorization middleware

Never put:

```text
JWT_SECRET
DATABASE_PASSWORD
API_KEYS
```

directly inside source code.

Use `.env`.

Create:

```text
.env.example
```

with placeholders.

---

# 30. Responsive Design

The application must work properly on:

```text
Desktop
Laptop
Tablet
Mobile
```

For mobile:

* Convert sidebar to mobile drawer
* Use responsive cards
* Make tables horizontally scrollable
* Keep buttons accessible
* Use proper spacing
* Ensure forms fit small screens

---

# 31. Loading and Error States

Every API-dependent page must have:

### Loading

Use skeleton loaders or spinners.

### Empty State

Example:

"No elections found."

### Error State

Example:

"Something went wrong. Please try again."

### Success

Use toast notifications.

---

# 32. Form Validation

Every form must validate:

* Required fields
* Email format
* Mobile number
* Password strength
* Date/time validity
* Duplicate records
* Election date conflicts

Display validation messages directly below fields.

---

# 33. UI Components

Create reusable components:

```text
Button
Input
Select
Modal
ConfirmDialog
Toast
Navbar
Sidebar
Card
Table
Pagination
SearchBar
Filter
Badge
Avatar
Dropdown
Loader
Skeleton
EmptyState
ErrorState
Chart
```

Do not duplicate UI code unnecessarily.

---

# 34. Dashboard Charts

Use Recharts.

Create:

### Line Chart

Votes over time.

### Bar Chart

Votes by candidate.

### Pie/Donut Chart

Election status.

### Progress Bars

Candidate vote percentage.

Make charts responsive.

---

# 35. Accessibility

Follow basic accessibility principles:

* Proper labels
* Keyboard navigation
* Visible focus states
* Sufficient contrast
* Accessible buttons
* Alt text for images
* ARIA labels where needed

---

# 36. Sample Data

Create seed data for development.

Create:

### Admin

```text
Email: admin@example.com
Password: Admin@123
Role: ADMIN
```

### Sample voters

Create at least 10 voters.

### Sample candidates

Create multiple candidates.

### Sample elections

Create:

```text
Student Council Election
College President Election
Class Representative Election
```

Use realistic sample data.

Clearly document the development credentials in the README and instruct the developer to change them before production.

---

# 37. Dashboard Statistics

Calculate statistics dynamically from PostgreSQL.

Do not hardcode:

```text
Total voters
Total elections
Total candidates
Total votes
```

These values must come from the database.

---

# 38. Important Voting Workflow

Implement this exact workflow:

```text
Voter Registration
       ↓
Email/Account Verification
       ↓
Login
       ↓
Voter Dashboard
       ↓
View Active Election
       ↓
View Candidates
       ↓
Select Candidate
       ↓
Review Vote
       ↓
Confirm Vote
       ↓
Backend Validation
       ↓
Check Election Status
       ↓
Check Voter Eligibility
       ↓
Check Duplicate Vote
       ↓
Store Vote
       ↓
Record Audit Event
       ↓
Show Vote Submitted
```

If any validation fails, reject the vote and show an appropriate error.

---

# 39. Election Lifecycle

Use:

```text
DRAFT
   ↓
UPCOMING
   ↓
ONGOING
   ↓
COMPLETED
   ↓
RESULTS PUBLISHED
```

The backend must prevent invalid transitions.

For example:

* Cannot vote in DRAFT
* Cannot vote in UPCOMING
* Can vote only in ONGOING
* Cannot vote in COMPLETED
* Cannot edit critical election settings after voting has started unless explicitly allowed

---

# 40. GitHub Requirements

Prepare the project for GitHub.

Create:

```text
README.md
.gitignore
.env.example
```

README should contain:

```text
Project Overview
Features
Technology Stack
Project Structure
Installation
Environment Variables
Database Setup
Migration Commands
Seed Commands
Running Frontend
Running Backend
API Documentation
Default Admin Credentials
Screenshots
Future Improvements
Contributors
License
```

Never commit `.env`.

---

# 41. Code Quality

Follow these rules:

* Clean code
* Meaningful variable names
* Reusable components
* Modular backend architecture
* Proper HTTP status codes
* Consistent API responses
* Centralized error handling
* Environment-based configuration
* No unnecessary duplicate code
* No hardcoded database credentials
* No hardcoded API URLs
* Comments only where useful

---

# 42. Final UI Pages

The completed application should contain at least these pages:

### Public/Auth

1. Splash / Welcome
2. Login
3. Register
4. Forgot Password
5. Reset Password

### Admin

6. Admin Dashboard
7. Elections
8. Create Election
9. Edit Election
10. Election Details
11. Candidates
12. Add Candidate
13. Voters
14. Voter Details
15. Results Dashboard
16. Reports
17. Notifications
18. Users
19. Audit Logs
20. Admin Profile
21. Settings

### Voter

22. Voter Dashboard
23. Active Elections
24. Election Details
25. Candidate Details
26. Vote Now
27. Vote Confirmation
28. Vote Submitted
29. My Votes
30. Results
31. Notifications
32. Voter Profile
33. Settings

---

# 43. Important UI Principle

Do not make every page look like a generic CRUD application.

The application should visually communicate:

```text
Security
Trust
Transparency
Professionalism
Simplicity
```

Use clear election status badges:

```text
● Ongoing
● Upcoming
● Completed
● Cancelled
```

Use confirmation dialogs for destructive actions.

Use toast notifications for successful actions.

Use skeleton loading for dashboard data.

---

# 44. Final Requirement

Build the application incrementally.

First create:

1. Project structure
2. Database schema
3. Backend configuration
4. Authentication
5. Role-based authorization
6. Frontend routing
7. Main UI layout
8. Admin dashboard
9. Election management
10. Candidate management
11. Voter management
12. Voting workflow
13. Results
14. Reports
15. Notifications
16. Audit logs
17. Settings
18. Responsive design
19. Security hardening
20. README documentation

Before considering the project complete, verify that:

* Admin can create an election.
* Admin can add candidates.
* Admin can manage voters.
* Voters can register/login.
* Voters can see eligible elections.
* Voters can vote.
* A voter cannot vote twice in the same election.
* Votes are stored correctly.
* Results are calculated from the database.
* Election status is enforced by the backend.
* Unauthorized users cannot access admin APIs.
* Application works on mobile and desktop.
* No secrets are committed to GitHub.
* All important actions are recorded in audit logs.

The final result should be a **complete, production-style Voting Management System**, not just a UI prototype.
