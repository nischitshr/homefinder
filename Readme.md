# HomeFinder (Full-Stack Assignment)

## Features
- User Registration & Login (JWT Authentication)
- Protected Routes
- Add/Remove Favourites
- Dashboard UI (React)

## Tech Stack
- Backend: Node.js, Express, MongoDB
- Frontend: React (Vite)

## Setup Instructions

### Backend
- cd backend
- npm install
- npm start

### Frontend
- cd frontend
- npm install
- npm run dev

## API Endpoints

POST /api/auth/login  
POST /api/auth/register  
GET /api/favourites  
POST /api/favourites  
DELETE /api/favourites/:propertyId  

## Flow
1. Register user  
2. Login → receive token  
3. Use token to access dashboard  
4. Add/remove favourites  



# Homefinder Project – Problems Faced & Solutions

## 1. Module Import Errors
**Problem:** Could not find module when importing files in Node.js.  
**Cause:** ES module imports were missing the `.js` extension.  
**Solution:** Added the `.js` extension to all imports, for example:  
```js
import connectDB from "./config/db.js";
````

---

## 2. Undefined Request Body

**Problem:** Request body was undefined when trying to access `req.body`.
**Cause:** `express.json()` middleware was missing or placed after routes.
**Solution:** Added JSON parsing middleware before routes:

```js
app.use(express.json());
```

---

## 3. Route Not Found

**Problem:** Could not POST to `/api/favourites`.
**Cause:** Routes were not properly registered in the server.
**Solution:** Registered the route correctly:

```js
app.use("/api/favourites", favouritesRoutes);
```

---

## 4. Authentication Issues

**Problem:** Received "Not authorized, no token" error.
**Cause:** Token was not sent in request headers.
**Solution:** Added token in the request headers from frontend:

```js
Authorization: `Bearer ${token}`
```

---

## 5. Frontend-Backend Connection Issues

**Problem:** API requests from frontend were not reaching the backend.
**Cause:** Incorrect API endpoint paths.
**Solution:** Fixed paths to match backend routes, for example:

```js
fetch("/api/auth/login", ...)
```

---

## 6. Vite Import Errors

**Problem:** Could not resolve imports like `./pages/Login`.
**Cause:** File was missing or path was incorrect.
**Solution:** Ensured correct folder structure:

```
src/pages/Login.jsx
```

---

## 7. Blank Screen in React

**Problem:** Frontend showed a blank page.
**Cause:** Incorrect export/import or runtime errors in components.
**Solution:** Fixed exports and imports, for example:

```js
export const loginUser = async (email, password) => { ... }
```

---

## 8. Git Push Rejected

**Problem:** Could not push to GitHub: remote contains work not in local repo.
**Cause:** Remote repository had changes missing locally.
**Solution:** Pulled changes first and then pushed:

```bash
git pull origin main --rebase
git push
```

---

## 9. Docker Setup Issues

**Problem:** Multiple issues while dockerizing frontend and backend.

* **Missing docker-compose file:** Created `docker-compose.yml` in the root.
* **Docker engine not running:** Started Docker Desktop.
* **Missing Dockerfile:** Added Dockerfile in both frontend and backend folders.
* **Node version mismatch for Vite:** Updated Dockerfile to use Node 20+.
* **Build context issues:** Fixed folder structure and paths in docker-compose.

---

## 10. MongoDB Data Verification

**Problem:** Could not see data in MongoDB.
**Cause:** Not using a database viewer.
**Solution:** Used MongoDB Compass to view collections and confirm stored data.

---

# Key Learnings

* Implemented JWT Authentication for secure login.
* Built RESTful APIs for user registration, login, and favourites.
* Connected React frontend with Node.js backend.
* Learned debugging full-stack issues.
* Used Docker to containerize the app.
* Managed version control and Git workflow.

---

# Summary

This project taught practical full-stack development, connecting frontend and backend, handling authentication, debugging, database usage, and containerization. It demonstrates readiness for full-stack development tasks and real-world problem-solving.

```

