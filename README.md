# QuickShow Clone

A full-stack movie booking app with a dark cinematic UI inspired by the referenced QuickShow layout.

## Features
- Dark hero background with glass navbar
- Featured and Trending movie sections
- Search movies by title/genre/language
- Movie details with trailer modal
- Seat booking with dynamic pricing
- Checkout flow
- Booking status: Confirmed / Cancelled
- Cancel booking before show time
- My Bookings with Upcoming / Past tabs
- Wishlist
- Reviews and ratings
- Profile section with booking counts
- Admin dashboard for movies, shows, and overview

## Stack
- Frontend: React + Vite + Tailwind CSS + Axios + React Router
- Backend: Node.js + Express + MongoDB + JWT + Mongoose

## Run

### Backend
```bash
cd backend
npm install
npm run seed
npm run dev
```

This will insert the default movie list into MongoDB so the app can display the Featured and Trending movies correctly.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Backend env
Create `backend/.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quickshow_clone
JWT_SECRET=supersecretkey
CLIENT_URL=http://localhost:5173
```

## Frontend env
Create `frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## First demo login
Register a new user from UI or seed admin manually in DB by setting role to `admin`.

## Docker deployment
A simple Docker setup is included for local deployment of the full stack.

Start all services:
```bash
docker compose up --build
```

Access:
- Frontend: http://localhost:4173
- Backend API: http://localhost:5000/api
- MongoDB: mongodb://127.0.0.1:27017

### Vercel deployment
This repository now supports deploying the full app on Vercel from the root.

1. Create a Vercel project and connect this repository.
2. Add these environment variables in the Vercel dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` (optional; Vercel will allow all origins if unset)
3. Deploy from the project root.

Vercel will build:
- `frontend` as a static React app
- `backend` as a serverless API available under `/api`

If you want, I can also add a Vercel-specific `README` section for staging and production domains.
