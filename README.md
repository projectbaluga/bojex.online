# bojex.online

Prototype social platform with a NestJS backend and a React frontend. The backend stores data in memory by default and exposes a small REST API. The frontend is a static demo and does not contact the API unless configured.

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
npm start
```
The server listens on `PORT` (default `3000`), has CORS enabled and serves uploaded files from `/uploads`.

### Frontend
```bash
cd frontend
cp .env.example .env   # optional
npm run dev
```
The frontend runs at `http://localhost:5173` and will only call the API if `VITE_API_URL` is set.

## API Overview

- `POST /auth/register` – create user `{ email, password }`.
- `POST /auth/login` – obtain `{ access_token }`.
- `GET /auth/google` & `GET /auth/discord` – placeholder, `501 Not Implemented`.
- `GET /users/:id` – fetch profile.
- `POST /users/:id/follow` – toggle follow; returns `{ following: boolean }`.
- `POST /posts` – multipart with fields `text` and optional `media`.
- `GET /posts` – list posts.
- `GET /posts/:id` – fetch a post.
- `POST /posts/:id/like` – toggle like/unlike; returns `{ liked, likes }`.
- `POST /posts/:id/comments` – add comment `{ content }`.

All data is kept in-memory unless `USE_MONGO=true` and `MONGO_URI` are provided.

## Example Requests

Register:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

Create a post with media:
```bash
curl -X POST http://localhost:3000/posts \
  -H "Authorization: Bearer <TOKEN>" \
  -F text="Hello" \
  -F media=@image.png
```

Toggle follow:
```bash
curl -X POST http://localhost:3000/users/<USER_ID>/follow \
  -H "Authorization: Bearer <TOKEN>"
```

## Environment Variables

Backend `.env`:
```
PORT=3000
JWT_SECRET=dev-secret
MONGO_URI=mongodb://localhost:27017/bojex
USE_MONGO=false
```

Frontend `.env`:
```
VITE_API_URL=http://localhost:3000
```

## Notes

- Uploaded files are available under `/uploads` when saved.
- The backend does **not** serve the frontend build.
- MongoDB is optional and disabled unless `USE_MONGO=true`.

## License

MIT
