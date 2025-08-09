# Installation

## Backend
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and adjust values:
   - `PORT`
   - `JWT_SECRET`
   - `MONGO_URI`
   - `USE_MONGO` (optional, defaults to `false`)
4. `npm start`

## Frontend
1. `cd frontend`
2. `npm install`
3. (Optional) copy `.env.example` to `.env` and set `VITE_API_URL`
4. `npm run dev`
