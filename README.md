# bojex.online

A prototype social platform where users can register, share posts with optional media, like and comment on posts, and follow other users. The repository is split into a NestJS backend and a React frontend.

> **Current Status:** Active development. The backend is largely feature-complete, while the frontend is still missing many features and polish. This project is not production-ready.

## Project Status

| Area | Progress |
|------|----------|
| Backend | ~85% |
| Frontend | ~50% |
| DevOps & Tooling | ~70% |
| Documentation | ~75% |

### 🔧 Backend
- [x] Authentication (JWT, register/login) – 100%
- [x] User profiles (follow, fetch, update) – 100%
- [x] Post system (create, fetch, delete, media upload) – 100%
- [ ] Likes & Comments – ~95%
- [ ] Input validation & error handling – ~90%
- [ ] Test coverage (Jest/unit/integration) – ~40%

### 🎨 Frontend
- [ ] Authentication forms & routing – ~50% (login implemented)
- [ ] Post feed & UI integration – ~70%
- [ ] Like/comment functionality – ~40%
- [ ] File uploads & previews – ~40%
- [ ] Responsive layout & polish – ~60%
- [ ] Test coverage (Vitest/unit/ui) – ~35%

### 🐳 DevOps & Tooling
- [ ] Working Docker Compose setup – ~80%
- [ ] Environment variables & config management – ~85%
- [x] Installation scripts – 100%
- [ ] CI/CD pipelines (GitHub Actions) – ~0%

### 📄 Documentation
- [ ] README accuracy – ~80%
- [ ] API reference in README – ~70%
- [ ] INSTALLATION.md completeness – ~65%
- [x] .env.example coverage – 100%

## Verified Features

### Backend
- Email/password registration and JWT based login
- Retrieve user profiles and follow/unfollow other users
- Update profile details (bio, avatar)
- Create text posts with optional media upload; list, view, and delete posts
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

## Setup

### Requirements
- Node.js 18+
- npm
- MongoDB (if running locally)
- Docker & Docker Compose (optional)

### Local Setup
1. Clone the repository and install dependencies:
   ```bash
   git clone https://example.com/bojex.online.git
   cd bojex.online
   ./install.sh
   ```
2. Ensure a MongoDB instance is running or set `MONGO_URI`.
3. Start the backend:
   ```bash
   cd backend
   npm start
   ```
4. Start the frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```
5. The backend runs at http://localhost:3000 and the frontend at http://localhost:5173.

### Docker Setup
Build and start the entire stack:
```bash
docker compose up --build
```
This launches MongoDB, the backend, and the frontend with the same URLs as above.

### Running Tests
- **Local:**
  ```bash
  cd backend && npm test
  cd frontend && npm test
  ```
- **Docker:**
  ```bash
  docker compose run --rm backend npm test
  docker compose run --rm frontend npm test
  ```

Additional Docker notes are available in [INSTALLATION.md](./INSTALLATION.md).

### Troubleshooting
- Backend tests may fail with a MongoDB Memory Server download 403 error. Clearing the `~/.cache/mongodb-binaries` directory or updating `mongodb-memory-server` can resolve this.
- Ensure Docker is running and ports `3000`/`5173` are free when using the compose setup.

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

