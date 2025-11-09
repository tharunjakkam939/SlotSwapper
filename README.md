
# 🧩 SlotSwapper 

### 👨‍💻 Developer
**Name:** Tharun Jakkam  
**Role:** Full Stack Developer Intern Applicant  
**Assignment:** ServiceHive SDE Assessment — Slot Swapping Platform  

---

## 📘 Problem Statement

Create a platform where users can:
- Register and log in  
- Create, view, and delete their **busy time slots**  
- Mark slots as **swappable**  
- View others’ swappable slots in a **marketplace**  
- Request to **swap** a slot  
- **Accept / Reject** incoming swap requests  

When both users agree, their respective events are exchanged.

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React (Vite) + React Router DOM |
| Backend | Node.js + Express.js |
| Database | SQLite via Prisma ORM |
| Authentication | JWT + bcrypt |
| Styling | CSS (custom gradients + hover effects) |
| Tools | Nodemon, CORS, dotenv |

---

## 🧩 Architecture Overview

```
┌──────────────────────────────┐
│         FRONTEND (React)     │
│  - Signup/Login               │
│  - Dashboard (My Events)      │
│  - Marketplace (Swaps)        │
│  - Requests (Pending Swaps)   │
│  ↓                            │
│  Fetch API calls → /api/...   │
└──────────────┬────────────────┘
               │
               ▼
┌──────────────────────────────┐
│        BACKEND (Express)     │
│ Routes:                      │
│  /auth → register/login       │
│  /events → CRUD + toggle      │
│  /marketplace → list swaps    │
│  /requests → send/accept/decline │
│ Middleware: JWT auth          │
│ ORM: Prisma + SQLite          │
└──────────────┬────────────────┘
               │
               ▼
┌──────────────────────────────┐
│      DATABASE (SQLite)       │
│  Tables:                     │
│   - User                     │
│   - Event                    │
│   - SwapRequest              │
└──────────────────────────────┘
```

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js (v18+)
- npm (v8+)

---

### 🗄️ Backend Setup

```bash
cd backend
npm install
```

**Create a `.env` file in `/backend`:**
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="yoursecretkey"
PORT=4000
```

**Generate and migrate database**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

**Run backend**
```bash
npm run dev
```

Server will start on **http://localhost:4000**

---

### 🖥️ Frontend Setup

```bash
cd ../frontend
npm install
```

**Create a `.env` file in `/frontend`:**
```env
VITE_API_URL=http://localhost:4000/api
```

**Start frontend**
```bash
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 🔐 API Documentation

### Auth Routes
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login and get JWT token |

---

### Event Routes
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/events` | Get user’s events |
| POST | `/api/events` | Create new event |
| DELETE | `/api/events/:id` | Delete an event |
| PUT | `/api/events/:id/status` | Toggle event status (BUSY ↔ SWAPPABLE) |

---

### Marketplace Routes
| Method | Endpoint | Description |
|---------|-----------|-------------|
| GET | `/api/marketplace` | View other users’ swappable slots |

---

### Swap Request Routes
| Method | Endpoint | Description |
|---------|-----------|-------------|
| POST | `/api/requests` | Send swap request |
| GET | `/api/requests` | View incoming/outgoing requests |
| PUT | `/api/requests/:id/accept` | Accept a request |
| PUT | `/api/requests/:id/reject` | Reject a request |

---

## 🧪 Testing Guide (PowerShell)

### 1️⃣ Register User
```powershell
$body = @{
    name = "Alice"
    email = "alice@example.com"
    password = "Pass123"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:4000/api/auth/register" -Method POST -ContentType "application/json" -Body $body
```

### 2️⃣ Login
```powershell
$body = @{
    email = "alice@example.com"
    password = "Pass123"
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/login" -Method POST -ContentType "application/json" -Body $body
$token = $response.token
```

### 3️⃣ Create Event
```powershell
$body = @{
    title = "AI Hackathon"
    startTime = "2025-11-15T09:00:00Z"
    endTime = "2025-11-15T17:00:00Z"
} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:4000/api/events" -Method POST -Headers @{ Authorization = "Bearer $token" } -ContentType "application/json" -Body $body
```

### 4️⃣ Mark Swappable
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/events/1/status" -Method PUT -Headers @{ Authorization = "Bearer $token" }
```

### 5️⃣ Marketplace
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/marketplace" -Method GET -Headers @{ Authorization = "Bearer $token" }
```

### 6️⃣ Send Request
```powershell
$body = @{ mySlotId = 1; theirSlotId = 2 } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:4000/api/requests" -Method POST -Headers @{ Authorization = "Bearer $token" } -ContentType "application/json" -Body $body
```

---

## 🎨 Frontend Features

| Page | Description |
|------|--------------|
| **Login / Signup** | JWT-based user authentication |
| **Dashboard** | View, add, delete, and toggle event status |
| **Marketplace** | Browse other users’ swappable events |
| **Requests** | View, accept, or reject swap requests |
| **Navbar** | Persistent navigation between pages |

✅ Includes hover animations, responsive layout, and color gradients.

---

## 📂 Folder Structure

```
SlotSwapper/
│
├── backend/
│   ├── prisma/schema.prisma
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── controllers/
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   └── App.jsx
    └── .env
```

---

## 🚀 Optional Enhancements

- ✅ Real-time swap updates via WebSockets (planned)
- ✅ Deployed-ready Docker configuration (optional)
- ✅ Unit test scaffolding using Jest
- ✅ Responsive UI for mobile users

---

## 🧠 Challenges & Learnings

- Managing event ownership swap consistency.
- Handling JWT auth in both frontend and backend cleanly.
- Overcoming CORS and Prisma schema validation errors.
- Improved async handling in frontend hooks.

---

## 🏁 Conclusion

**SlotSwapper** fulfills all ServiceHive assignment deliverables:
- ✅ Authentication & Authorization  
- ✅ CRUD operations on user slots  
- ✅ Swap logic implementation  
- ✅ Marketplace visibility  
- ✅ UI/UX frontend integration  
- ✅ Proper documentation and setup  

---

## 👨‍💻 Author
**Tharun Jakkam**  
📧 tharun.jakkam@example.com  
💼 GitHub: [github.com/yourusername](https://github.com/yourusername)
