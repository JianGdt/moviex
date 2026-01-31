# 🎬 moviex  

**A full‑stack movie catalog application built with TypeScript, Node.js, Express, MongoDB, JWT authentication and a Vite‑powered React front‑end.**  

---  

## Badges  

| Technology | Badge |
|------------|-------|
| Node.js | ![Node.js](https://img.shields.io/badge/Node.js-20.x-green) |
| Express | ![Express](https://img.shields.io/badge/Express-4.x-lightgrey) |
| MongoDB | ![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green) |
| Mongoose | ![Mongoose](https://img.shields.io/badge/Mongoose-8.x-blue) |
| TypeScript | ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) |
| Vite | ![Vite](https://img.shields.io/badge/Vite-6.x-yellow) |
| React | ![React](https://img.shields.io/badge/React-18.x-blue) |
| JWT | ![JWT](https://img.shields.io/badge/JWT-9.x-orange) |
| Bcrypt | ![Bcrypt](https://img.shields.io/badge/bcryptjs-2.x-lightgrey) |
| Axios | ![Axios](https://img.shields.io/badge/Axios-1.x-blue) |

---  

## Table of Contents  

1. [Project Overview](#-project-overview)  
2. [Tech Stack](#-tech-stack)  
3. [Features](#-features)  
4. [Folder Structure](#-folder-structure)  
5. [Prerequisites](#-prerequisites)  
6. [Installation & Setup](#-installation--setup)  
7. [Environment Variables](#-environment-variables)  
8. [Running the Application](#-running-the-application)  
9. [API Reference](#-api-reference)  
10. [Frontend Usage Examples](#-frontend-usage-examples)  
11. [Testing & Linting (optional)](#-testing--linting-optional)  
12. [Deployment Guide](#-deployment-guide)  
13. [Contributing](#-contributing)  
14. [Troubleshooting](#-troubleshooting)  
15. [License](#-license)  

---  

## 🎯 Project Overview  

`moviex` is a **single‑page application** that lets users:

* **Register / login** with email & password (passwords are salted & hashed with **bcryptjs**).  
* **Browse**, **search**, **add**, **edit**, and **delete** movies in a shared catalog.  
* **Persist** data in a **MongoDB** database via **Mongoose** models.  
* Secure API calls with **JWT** stored in an **httpOnly** cookie.  

The back‑end is an **Express** server written in **TypeScript** (`backend/`).  
The front‑end is a **React** app bootstrapped with **Vite** (`frontend/`).  

---  

## 🛠️ Tech Stack  

| Layer | Library / Framework | Primary Role |
|-------|---------------------|--------------|
| Runtime | **Node.js** (v20+) | Server runtime |
| Server | **Express** | HTTP routing & middleware |
| Language | **TypeScript** | Static typing for both back‑ and front‑end |
| DB | **MongoDB** + **Mongoose** | Document store & ODM |
| Auth | **bcryptjs**, **jsonwebtoken** | Password hashing & JWT handling |
| CORS / Cookies | **cors**, **cookie-parser** | Cross‑origin & cookie support |
| Front‑end | **React** + **Vite** | UI & dev server |
| HTTP client | **axios** | API calls from React |
| Dev tools | **nodemon**, **cross‑env** | Auto‑restart & env handling |

---  

## ✨ Features  

| Feature | Description | Key Files |
|---------|-------------|-----------|
| **User registration** | Stores a salted hash of the password. | `backend/routes/auth.ts`, `backend/models/User.ts` |
| **Login + JWT issuance** | Returns a signed JWT in an httpOnly cookie. | `backend/controllers/authController.ts` |
| **Auth middleware** | Protects routes by verifying JWT. | `backend/middleware/auth.ts` |
| **Movie CRUD** | Create, read, update, delete movies. | `backend/routes/movies.ts`, `backend/models/Movie.ts` |
| **Search & pagination** | Query movies by title, genre, with limit/skip. | `backend/controllers/movieController.ts` |
| **React UI** | List movies, add/edit forms, login/register pages. | `frontend/src/pages/*`, `frontend/src/components/*` |
| **Axios interceptor** | Automatically attaches JWT cookie & handles 401. | `frontend/src/api/axiosInstance.ts` |
| **Environment based config** | `.env` for DB URI, JWT secret, client URL. | `backend/server.js`, `frontend/.env` |
| **Production build script** | Installs front‑end, builds assets, serves via Express. | `package.json` → `build` script |

---  

## 📂 Folder Structure  

```
moviex/
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ backend/
│   ├─ server.js                # entry point (Express app)
│   ├─ config/
│   │   └─ db.ts                # mongoose connection
│   ├─ middleware/
│   │   └─ auth.ts              # JWT verification
│   ├─ models/
│   │   ├─ User.ts
│   │   └─ Movie.ts
│   ├─ routes/
│   │   ├─ auth.ts
│   │   └─ movies.ts
│   └─ controllers/
│       ├─ authController.ts
│       └─ movieController.ts
└─ frontend/
    ├─ vite.config.ts
    ├─ index.html
    ├─ src/
    │   ├─ main.tsx
    │   ├─ App.tsx
    │   ├─ api/
    │   │   └─ axiosInstance.ts
    │   ├─ components/
    │   │   ├─ MovieCard.tsx
    │   │   └─ Navbar.tsx
    │   ├─ pages/
    │   │   ├─ Home.tsx
    │   │   ├─ Login.tsx
    │   │   ├─ Register.tsx
    │   │   └─ MovieForm.tsx
    │   └─ context/
    │       └─ AuthContext.tsx
    └─ public/
        └─ assets/
```

> **Note** – All source files are written in **TypeScript** (`.ts` / `.tsx`).  

---  

## 📋 Prerequisites  

| Tool | Minimum Version |
|------|-----------------|
| **Node.js** | 20.x |
| **npm** | 10.x (or `yarn`/`pnpm` if you prefer) |
| **MongoDB** | 6.x (local or Atlas) |
| **Git** | any recent version |

---  

## 🚀 Installation & Setup  

```bash
# 1️⃣ Clone the repo
git clone https://github.com/JianGdt/moviex.git
cd moviex

# 2️⃣ Install root dependencies (nodemon, cross-env, etc.)
npm install

# 3️⃣ Install front‑end dependencies
npm install --prefix frontend
```

### Create a `.env` file (root of the repo)

```dotenv
# backend/.env (loaded by backend/server.js via dotenv)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/moviex?retryWrites=true&w=majority
JWT_SECRET=yourSuperSecretKey
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173   # Vite dev server
PORT=5000
```

> **Tip:** Keep the `.env` file out of version control (already listed in `.gitignore`).  

---  

## 🛠️ Environment Variables  

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/moviex` |
| `JWT_SECRET` | Secret used to sign JWTs | `myVerySecretKey123` |
| `JWT_EXPIRES_IN` | Token lifetime (e.g., `7d`, `12h`) | `7d` |
| `CLIENT_URL` | Front‑end origin for CORS & cookie `sameSite` | `http://localhost:5173` |
| `PORT` | Port on which Express runs (default `5000`) | `5000` |

---  

## ▶️ Running the Application  

### Development mode  

```bash
# Start the back‑end with hot‑reload
npm run dev
# → backend/server.js runs on http://localhost:5000

# In another terminal, start the Vite dev server
npm run dev --prefix frontend
# → http://localhost:5173
```

The front‑end is configured to proxy API calls to `http://localhost:5000/api/*` (see `vite.config.ts`).  

### Production build  

```bash
npm run build
# 1️⃣ Installs front‑end deps (if missing)
# 2️⃣ Runs `npm run build` inside `frontend/` → creates `frontend/dist`
# 3️⃣ Express serves the static files from `frontend/dist`
```

After the build finishes, start the server in production mode:

```bash
npm start
# → Serves both API and static React bundle on PORT (default 5000)
```

---  

## 📡 API Reference  

All endpoints are prefixed with **`/api`** and return JSON.  
Protected routes require a valid JWT cookie (`auth_token`).  

### Auth  

| Method | Endpoint | Description | Body (JSON) | Returns |
|--------|----------|-------------|-------------|---------|
| `POST` | `/api/auth/register` | Create a new user | `{ "email": "...", "password": "..." }` | `{ "message": "User created" }` |
| `POST` | `/api/auth/login` | Authenticate & receive JWT cookie | `{ "email": "...", "password": "..." }` | `{ "message": "Logged in" }` (sets `auth_token` cookie) |
| `POST` | `/api/auth/logout` | Clear JWT cookie | – | `{ "message": "Logged out" }` |

**Implementation highlights** (see `backend/routes/auth.ts` & `backend/controllers/authController.ts`):

```ts
// password hashing
const hashed = await bcrypt.hash(password, 12);

// JWT creation
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
  expiresIn: process.env.JWT_EXPIRES_IN,
});
res.cookie('auth_token', token, {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
});
```

### Movies (protected)  

| Method | Endpoint | Description | Body (JSON) | Returns |
|--------|----------|-------------|-------------|---------|
| `GET` | `/api/movies` | List movies (supports `?page=` & `?search=`) | – | `{ movies: [...], total, page }` |
| `GET` | `/api/movies/:id` | Get a single movie | – | `{ movie: {...} }` |
| `POST` | `/api/movies` | Add a new movie | `{ title, genre, year, description }` | `{ movie: {...} }` |
| `PUT` | `/api/movies/:id` | Update a movie | same shape as POST | `{ movie: {...} }` |
| `DELETE` | `/api/movies/:id` | Remove a movie | – | `{ message: "Deleted" }` |

**Auth middleware** (`backend/middleware/auth.ts`) is applied to the router:

```ts
router.use(authMiddleware); // all routes below require a valid JWT
```

---  

## 💻 Frontend Usage Examples  

### Axios instance (`frontend/src/api/axiosInstance.ts`)

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true, // send httpOnly cookie
});

export default api;
```

### Register component (`frontend/src/pages/Register.tsx`)

```tsx
import { useState } from 'react';
import api from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <h2 className="text-2xl mb-4">Create an account</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="input mt-2"
      />
      <button type="submit" className="btn mt-4">
        Register
      </button>
    </form>
  );
}
```

### Fetching movies (Home page)

```tsx
import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api
      .get(`/movies?page=${page}`)
      .then(res => setMovies(res.data.movies))
      .catch(console.error);
  }, [page]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {movies.map(m => (
        <MovieCard key={m._id} movie={m} />
      ))}
    </div>
  );
}
```

---  

## 🧪 Testing & Linting (optional)

The repo does not ship with a test suite yet, but you can quickly add **Jest** or **Vitest**:

```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom
```

Add a script:

```json
"scripts": {
  "test": "vitest run"
}
```

---  

## 🚢 Deployment Guide  

### 1️⃣ Build the front‑end  

```bash
npm run build   # creates frontend/dist
```

### 2️⃣ Deploy the whole repo to a Node‑compatible host  

* **Heroku / Render / Railway** – set the `build` script as the *build command* and `npm start` as the *run command*.  
* **Docker** – a minimal Dockerfile example:

```dockerfile
# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build   # builds frontend & leaves backend ready

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY package*.json ./
RUN npm ci --production
EXPOSE 5000
CMD ["npm", "start"]
```

### 3️⃣ Environment variables  

Add the same `.env` variables to your hosting platform (never commit secrets).  

### 4️⃣ Database  

Use **MongoDB Atlas** (free tier) for production. Whitelist the host IPs and update `MONGODB_URI`.  

---  

## 🤝 Contributing  

1. Fork the repository.  
2. Create a feature branch: `git checkout -b feat/awesome-feature`.  
3. Install dependencies (`npm install` & `npm install --prefix frontend`).  
4. Make your changes, ensuring TypeScript compiles (`npm run dev` should start without errors).  
5. Write or update documentation/comments.  
6. Submit a Pull Request with a clear description of the change.  

> **Code style** – Follow the existing conventions (ESLint is not configured yet, but try to keep the same formatting).  

---  

## 🐛 Troubleshooting  

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `Error: connect ECONNREFUSED 127.0.0.1:27017` | MongoDB not running or wrong URI | Start MongoDB locally or update `MONGODB_URI` to a reachable Atlas cluster |
| `401 Unauthorized` on API calls | Missing or expired JWT cookie | Ensure