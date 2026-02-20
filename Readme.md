# TaskFlow — Task Management System

A full-stack task management app built with Next.js 16, Node.js, and PostgreSQL.

🌐 **Live Demo:** [task-management-system-xi-gules.vercel.app](https://task-management-system-xi-gules.vercel.app/login)
📦 **GitHub:** [github.com/Hmtgit7/task-management-system](https://github.com/Hmtgit7/task-management-system)

---

## Tech Stack

| Layer     | Technology                                |
|-----------|-------------------------------------------|
| Frontend  | Next.js 16, React 19, TypeScript          |
| Styling   | Tailwind CSS v4, shadcn/ui, Framer Motion |
| State     | Zustand, TanStack Query                   |
| Backend   | Node.js, Express, TypeScript              |
| Database  | PostgreSQL, Prisma ORM                    |
| Auth      | JWT (access + refresh tokens), bcrypt     |

---

## Project Structure

```
task-management-system/
├── frontend/   # Next.js app
├── backend/    # Express API
└── README.md
```

---

## Quick Start

```bash
git clone https://github.com/Hmtgit7/task-management-system.git
cd task-management-system

# Start backend
cd backend && npm install && npm run dev

# Start frontend (new terminal)
cd frontend && npm install && npm run dev
```

App runs at `http://localhost:3000`

---

## Features

- ✅ JWT authentication with auto token refresh
- ✅ Task CRUD — create, edit, delete, toggle complete
- ✅ Categories with color labels
- ✅ Priority & status filtering + sorting
- ✅ Dashboard analytics with charts
- ✅ Overdue task alerts
- ✅ Infinite scroll pagination
- ✅ Dark / light theme
- ✅ Fully responsive (mobile + desktop)

---

## License

MIT © 2026 Hemant Gehlod