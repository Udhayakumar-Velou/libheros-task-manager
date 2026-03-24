# 📝 Task Manager App

> A full-stack task management application built with **Vue 3** and **NestJS** — create lists, manage tasks, and track your progress in one clean interface.

![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square&logo=vue.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-e0234e?style=flat-square&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## 🚀 Live Demo

👉 **[https://libheros-task-manager.vercel.app/login](https://libheros-task-manager.vercel.app/login)**

---

## ✨ Features

- 🔐 **User Authentication** — Register & Login with JWT
- 📂 **Task Lists** — Create and delete task lists
- 📝 **Task Management** — Add, update, and delete tasks
- ✅ **Progress Tracking** — Mark tasks as completed
- 📅 **Due Dates** — Set deadlines for each task
- 📊 **Task Details Panel** — View full task information at a glance
- 🗑️ **Safe Deletes** — Confirmation modals before any deletion

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | Vue 3 (Composition API), Vite, Tailwind CSS, Axios |
| Backend     | NestJS, TypeORM                     |
| Database    | PostgreSQL                          |
| Auth        | JWT (JSON Web Tokens)               |
| Deployment  | Vercel (Frontend), Railway (Backend & DB) |

---

## 📁 Project Structure

```
libheros-task-manager/
├── frontend/          # Vue 3 app
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   └── ...
│   └── .env
├── backend/           # NestJS API
│   ├── src/
│   │   ├── auth/
│   │   ├── tasks/
│   │   ├── lists/
│   │   └── ...
│   └── .env
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) (or use the Railway hosted DB)

### 1. Clone the Repository

```bash
git clone https://github.com/Udhayakumar-Velou/libheros-task-manager.git
cd libheros-task-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

**Frontend** — create a `.env` file inside the `frontend/` folder:

```env
VITE_API_URL=https://libheros-task-manager-production.up.railway.app
```

**Backend** — create a `.env` file inside the `backend/` folder:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 4. Run the App

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

---

## 🔌 API Overview

| Method | Endpoint            | Description           |
|--------|---------------------|-----------------------|
| POST   | `/auth/register`    | Register a new user   |
| POST   | `/auth/login`       | Login & receive JWT   |
| GET    | `/lists`            | Get all task lists    |
| POST   | `/lists`            | Create a new list     |
| DELETE | `/lists/:id`        | Delete a list         |
| GET    | `/tasks/:listId`    | Get tasks in a list   |
| POST   | `/tasks`            | Create a new task     |
| PATCH  | `/tasks/:id`        | Update a task         |
| DELETE | `/tasks/:id`        | Delete a task         |

---

## 🚢 Deployment

| Service  | Platform | URL |
|----------|----------|-----|
| Frontend | [Vercel](https://vercel.com) | [Live App](https://libheros-task-manager.vercel.app) |
| Backend  | [Railway](https://railway.app) | `https://libheros-task-manager-production.up.railway.app` |
| Database | Railway (PostgreSQL) | Managed via Railway |

---

## 📌 What This Project Demonstrates

- ✅ Full-stack development with Vue 3 + NestJS
- ✅ RESTful API design & integration
- ✅ JWT-based authentication flow
- ✅ Relational data modeling with TypeORM & PostgreSQL
- ✅ Modern deployment with Vercel & Railway

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Udhayakumar Velou**  
[GitHub](https://github.com/Udhayakumar-Velou)
