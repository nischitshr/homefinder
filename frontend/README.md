# Homefinder - Buyer Portal

A simple real estate buyer portal built with React (frontend) and Node.js/Express (backend). Features user authentication, JWT-based sessions, and a favorites system for properties.

## Features

- User registration and login with email/password
- JWT authentication with secure password hashing
- Buyer dashboard showing user name, role, and favorites
- Add/remove properties to/from favorites
- Protected routes (users can only access/modify their own data)
- Basic validation and error handling
- Responsive UI with a nature-inspired theme

## Tech Stack

- **Frontend**: React, Vite, CSS
- **Backend**: Node.js, Express.js, MongoDB, JWT, bcrypt
- **Database**: MongoDB (users with favorites array)

## Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud instance)
- npm or yarn

## Setup and Run

### Backend Setup
1. Navigate to the `backend` folder:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables: Create a `.env` file in `backend/` with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/homefinder
   JWT_SECRET=your-secret-key-here
   ```
4. Start the backend server:
   ```
   npm start
   ```
   Server runs on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
   App runs on `http://localhost:5173`.

### Database
- Ensure MongoDB is running locally or update `MONGODB_URI` for a cloud instance.
- The app will create collections automatically.

## Example Flows

### 1. Sign Up → Login → Add Favourite
1. Open the app at `http://localhost:5173`.
2. Click "Create an account" to register:
   - Enter name, email, and a strong password (8+ chars, uppercase, lowercase, number, symbol).
   - Submit and see success message.
3. Login with your email/password.
4. On the dashboard, enter a property ID (e.g., "prop101") in the "Add Favourite" input.
5. Click "Add" – the property appears in "My Favourite Properties".
6. To remove, click the "Remove" button on the property card.

### 2. Error Handling
- Try registering with an existing email → "User already exists".
- Login with wrong password → "Invalid email or password".
- Add invalid property ID → Error message shown.

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/change-password` - Change password (protected)
- `GET /api/favourites` - Get user favorites (protected)
- `POST /api/favourites` - Add favorite (protected)
- `DELETE /api/favourites/:id` - Remove favorite (protected)

## Security Notes

- Passwords are hashed with bcrypt (salt rounds: 10).
- JWT tokens expire in 1 day.
- Email lookups are case-insensitive for login.
- All sensitive routes require authentication.

## Development

- Frontend: `npm run dev` for hot reload.
- Backend: `npm start` (uses nodemon for auto-restart).
- Build frontend: `npm run build` in `frontend/`.

## Notes

- Properties are currently dummy data. In a real app, integrate with a property API.
- For production, add HTTPS, rate limiting, and environment-specific configs.
