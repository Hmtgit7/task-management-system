# TaskFlow — Frontend

Next.js 16 frontend for the TaskFlow task management system.

🌐 **Live:** [task-management-system-xi-gules.vercel.app](https://task-management-system-xi-gules.vercel.app/login)

---

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animation:** Framer Motion
- **State:** Zustand (auth) + TanStack Query (server state)
- **Forms:** React Hook Form + Zod
- **HTTP:** Axios with auto-refresh interceptor
- **Charts:** Recharts

---

## Setup

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

Open `http://localhost:3000`

---

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Key Pages

| Route        | Description                 |
| ------------ | --------------------------- |
| `/`          | Landing page                |
| `/register`  | Create account              |
| `/login`     | Sign in                     |
| `/dashboard` | Task management (protected) |

---

## Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```
