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
cd backend
npm install
npm start

### Frontend
cd frontend
npm install
npm run dev

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
