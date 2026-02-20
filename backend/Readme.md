# TaskFlow — Backend API

Express + TypeScript REST API for the TaskFlow task management system.

---

## Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** JWT (access + refresh), bcrypt
- **Validation:** Zod
- **Logging:** Winston
- **Security:** Helmet, CORS, cookie-parser

---

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values (see below)
npx prisma migrate dev
npm run dev
```

Server runs at `http://localhost:5000`

---

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/taskflow
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## API Endpoints

### Auth — `/auth`

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| POST   | /auth/register | Create account |
| POST   | /auth/login    | Sign in        |
| POST   | /auth/refresh  | Refresh tokens |
| POST   | /auth/logout   | Sign out       |

### Tasks — `/tasks` _(auth required)_

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| GET    | /tasks            | List tasks (paginated, filtered) |
| POST   | /tasks            | Create task                      |
| GET    | /tasks/analytics  | Dashboard analytics              |
| GET    | /tasks/:id        | Get single task                  |
| PATCH  | /tasks/:id        | Update task                      |
| DELETE | /tasks/:id        | Delete task                      |
| PATCH  | /tasks/:id/toggle | Toggle complete                  |

### Categories — `/categories` _(auth required)_

| Method | Endpoint        | Description     |
| ------ | --------------- | --------------- |
| GET    | /categories     | List categories |
| POST   | /categories     | Create category |
| DELETE | /categories/:id | Delete category |

---

## Scripts

```bash
npm run dev      # Nodemon + ts-node
npm run build    # Compile TypeScript
npm start        # Run compiled output
```
