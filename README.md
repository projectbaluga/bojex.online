# bojex.online

## 📌 Project Overview
**bojex.online** is a minimalist social platform. Users can register, log in and publish short posts with optional image or video attachments. Other users can like posts, leave comments and follow each other. The stack consists of a [NestJS](https://nestjs.com/) backend connected to MongoDB and a [React](https://react.dev/) + [Vite](https://vitejs.dev/) frontend. Media files are stored on disk and exposed as static assets.

## 🧱 Project Structure
| Path | Description |
|------|-------------|
| `backend/` | NestJS API server, authentication, posts, likes, comments and user modules. |
| `backend/uploads/` | Uploaded media files served under `/uploads`. |
| `frontend/` | React single-page application built with Vite. |
| `frontend/dist/` | Production build output after `npm run build`. |

## ⚙️ Installation Guide
### Prerequisites
- Node.js **18+** and npm
- Local [MongoDB](https://www.mongodb.com/) instance (default connection: `mongodb://localhost/bojex`)
- Git

### 1. Clone the repository
```bash
git clone <REPO_URL>
cd bojex.online
```

### 2. Backend setup
```bash
cd backend
npm install
# copy the example environment file
cp .env.example .env
```
Adjust values in `.env` as needed:
```env
PORT=3000                # HTTP port for the API
MONGODB_URI=mongodb://localhost/bojex # MongoDB connection string
JWT_SECRET=secret        # JWT signing key
UPLOAD_DIR=uploads       # Directory for uploaded media
```
Start MongoDB, then run the server:
```bash
npm start
```
The API listens on **http://localhost:3000** and exposes uploaded files at `http://localhost:3000/uploads/*`.

### 3. Frontend setup
```bash
cd ../frontend
npm install
# copy the example environment file
cp .env.example .env
```
Adjust values in `.env` as needed:
```env
VITE_API_URL=http://localhost:3000 # Base URL of the backend
```
Start the Vite dev server:
```bash
npm run dev
```
The SPA is available at **http://localhost:5173**. Start the backend before the frontend so API calls succeed.

### 4. Build for production
```bash
npm run build
```
The optimized bundle is emitted to `frontend/dist/`.

## 🧪 Usage & Features
1. Open the frontend in your browser.
2. **Register** a new account or **log in** with an existing one.
3. After authentication you can:
   - Create posts with text and optional media uploads (JPEG, PNG, GIF, MP4 up to 10 MB).
   - Like posts, add comments and view a live like/comment count.
   - View your profile including follower/following counts.
   - Follow or unfollow other users.

## 🔗 API Reference
All JSON endpoints return `application/json`. Routes marked with 🔐 require an `Authorization: Bearer <token>` header.

### Authentication
| Method & Route | Body | Description |
|----------------|------|-------------|
| `POST /auth/register` | `{ email, password }` | Create a new account. |
| `POST /auth/login` | `{ email, password }` | Obtain JWT token and user info. |
| `GET /auth/google` | – | Placeholder for future Google OAuth. |
| `GET /auth/discord` | – | Placeholder for future Discord OAuth. |

### Users
| Method & Route | Body | Description |
|----------------|------|-------------|
| `GET /users/:id` | – | Retrieve public profile data. |
| `POST /users/:id/follow` | `{ followerId }` | Current user follows `:id`. |
| `POST /users/:id/unfollow` | `{ followerId }` | Current user unfollows `:id`. |

### Posts
| Method & Route | Body | Description |
|----------------|------|-------------|
| `GET /posts` | – | List all posts. |
| `POST /posts` 🔐 | `multipart/form-data { userId, text, file? }` | Create a post with optional media upload. |
| `POST /posts/:id/like` 🔐 | `{ userId }` | Like a post. |
| `POST /posts/:id/comments` 🔐 | `{ userId, text }` | Add a comment to a post. |

## 🧩 Environment Variables
| Variable | Location | Default | Purpose |
|----------|----------|---------|---------|
| `PORT` | `backend/.env` | `3000` | HTTP port for the API server. |
| `MONGODB_URI` | `backend/.env` | `mongodb://localhost/bojex` | MongoDB connection string. |
| `JWT_SECRET` | `backend/.env` | `secret` | Secret used to sign JWTs. |
| `UPLOAD_DIR` | `backend/.env` | `uploads` | Directory for storing uploaded media. |
| `VITE_API_URL` | `frontend/.env` | `http://localhost:3000` | Base URL of the backend API. |

## 🚀 Deployment Notes
### Backend
1. Install dependencies with `npm install`.
2. Set environment variables and ensure MongoDB is reachable.
3. Start with `npm start` (consider a process manager like PM2 for production).
4. Expose the `uploads/` directory or use a CDN for media files.

### Frontend
1. Run `npm run build` to produce static files in `frontend/dist/`.
2. Serve the contents of `frontend/dist/` via any static hosting (Nginx, S3, Vercel, etc.).
3. Configure `VITE_API_URL` at build time to point to the deployed backend.

## License
MIT
