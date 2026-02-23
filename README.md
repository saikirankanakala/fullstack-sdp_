# StudyWork — Student Work-Study Management System

A premium, production-ready SaaS-style web platform for managing student work-study programs. Built with React, Vite, Tailwind CSS, Framer Motion, and Recharts.

## ✨ Features

### Admin Role
- **Overview Dashboard** — Stats cards + Area, Pie & Bar charts (Recharts)
- **Post New Job** — Form with validation, live pay preview, and toast notifications
- **Manage Applications** — Filter by status, search, approve/reject with badge updates
- **Track Work Hours** — Per-student summary, filter, and approve submissions

### Student Role
- **Browse Jobs** — Search, department filter, job detail modal with apply flow
- **My Applications** — Status tracking (Pending / Approved / Rejected)
- **Log Work Hours** — Select approved job, submit hours, view history
- **Performance Feedback** — Star ratings and admin comments

### Global
- 🌗 Light/Dark mode (persisted to localStorage)
- 🗃️ All data persisted to localStorage
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔀 Smooth Framer Motion page & modal transitions
- 📣 Toast notifications (react-hot-toast)
- 🛡️ Error boundary
- ↔️ Collapsible animated sidebar

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔐 Mock Login

No real authentication — just click a role and pick a user:

| Role    | Users Available |
|---------|----------------|
| Admin   | Dr. Sarah Mitchell |
| Student | Alex Johnson, Maria Garcia, James Chen, Priya Patel |

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Vite + React | Bundler & framework |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| React Router v7 | Routing |
| Recharts | Charts |
| Lucide React | Icons |
| react-hot-toast | Notifications |
| clsx | Class utilities |

## 🗂️ Project Structure

```
src/
├── components/
│   ├── ui/           # Design system (Button, Card, Badge, Modal, etc.)
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   └── ErrorBoundary.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── AppContext.jsx
│   └── ThemeContext.jsx
├── data/
│   └── mockData.js
├── hooks/
│   ├── useLocalStorage.js
│   └── useToast.js
├── layouts/
│   └── AppLayout.jsx
├── pages/
│   ├── auth/LoginPage.jsx
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── PostJobPage.jsx
│   │   ├── ManageApplicationsPage.jsx
│   │   └── TrackHoursPage.jsx
│   └── student/
│       ├── BrowseJobsPage.jsx
│       ├── MyApplicationsPage.jsx
│       ├── LogHoursPage.jsx
│       └── FeedbackPage.jsx
└── App.jsx
```

## 🌐 Deployment on Vercel

1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**
3. Import your GitHub repo
4. Use these settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**

The included `vercel.json` handles SPA routing automatically.

## 🔧 Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📝 License

MIT — free to use and modify.
