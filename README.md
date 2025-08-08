# bojex.online

A prototype social platform where users can register, share posts with optional media, like and comment on posts, and follow other users. The repository is split into a NestJS backend and a React frontend.

## Features

### Backend
- Email/password registration and JWT based login
- Retrieve user profiles and follow/unfollow other users
- Create text posts with optional media upload; list and view posts
- Like/unlike and comment on posts
- Data persisted in MongoDB

### Frontend
- React UI built with Vite and Tailwind CSS
- Components for navigation, posts, comments, modals and upload previews
- Connects to the API for authentication and post feeds

## Technologies
- **Backend:** Node.js, NestJS, TypeScript, Passport, JWT
- **Database:** MongoDB with Mongoose
- **Frontend:** React 18, Vite, Tailwind CSS, Heroicons

## Installation

### Requirements
- Docker
- Docker Compose

### Run with Docker
Build and start the entire stack:
```bash
docker compose up --build
```
The backend runs at http://localhost:3000 and the frontend at http://localhost:5173.

### Running Tests
Execute tests inside their containers:
```bash
docker compose run --rm backend npm test
docker compose run --rm frontend npm test
```

For additional details, see [INSTALLATION.md](./INSTALLATION.md).

## Folder Structure
```
backend/
  src/
    auth/
    users/
    posts/
    comments/
    likes/
    common/
    config/
frontend/
  src/
    components/
    App.jsx
    main.jsx
```

## Usage

### Basic Flow
1. Register a user
2. Log in to obtain a JWT access token
3. Use the token to create posts, like and comment on posts, and follow other users

### Example Requests

Register:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

Login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

Create Post:
```bash
curl -X POST http://localhost:3000/posts \
  -H "Authorization: Bearer <TOKEN>" \
  -F text="Hello" \
  -F media=@image.png
```

Like Post:
```bash
curl -X POST http://localhost:3000/posts/<POST_ID>/like \
  -H "Authorization: Bearer <TOKEN>"
```

Comment on Post:
```bash
curl -X POST http://localhost:3000/posts/<POST_ID>/comments \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"content":"Nice!"}'
```

Follow User:
```bash
curl -X POST http://localhost:3000/users/<USER_ID>/follow \
  -H "Authorization: Bearer <TOKEN>"
```

## API Reference

### Auth
- `POST /auth/register` – create account. Body: `{ email, password }`. Returns user without password.
- `POST /auth/login` – authenticate and receive `{ access_token }`.

### Users
- `GET /users/:id` – get public profile.
- `POST /users/:id/follow` – toggle follow/unfollow (requires JWT).

### Posts
- `POST /posts` – create post with `text` and optional `media` (multipart). Requires JWT.
- `GET /posts` – list all posts.
- `GET /posts/:id` – view a post.
- `POST /posts/:id/like` – like/unlike a post (requires JWT).
- `POST /posts/:id/comments` – add a comment with `{ content }` (requires JWT).

## Environment Variables
- `PORT` – server port, default `3000`.
- `JWT_SECRET` – secret used to sign JWTs.
- `MONGO_URI` – MongoDB connection string.
- `VITE_API_URL` – frontend base URL for the backend API.

## Deployment Notes
- Build the frontend with `cd frontend && npm run build` (output in `frontend/dist`).
- Run the backend with `cd backend && npm start`.
- Ensure the `uploads/` directory is writable if you enable media uploads in production.

## License

MIT

