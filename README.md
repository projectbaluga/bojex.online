# bojex.online

## Project Overview
bojex.online is a lightweight prototype for a social content sharing platform.  It lets people register, log in and publish short posts with optional image or video attachments.  Other users can like posts, leave comments and follow each other.  The project is split into a NestJS backend and a React + Vite frontend and currently stores data in memory with uploaded files written to disk.

## Project Structure
| Path | Description |
|------|-------------|
| `backend/` | [NestJS](https://nestjs.com/) API server and file uploads. |
| `backend/uploads/` | Uploaded media files served as static assets. |
| `frontend/` | [React](https://react.dev/) SPA built with [Vite](https://vitejs.dev/). |

## Installation
### Prerequisites
- Node.js **18+** and npm
- Git

### Clone the repository
```bash
git clone <REPO_URL>
cd bojex.online
```

### Backend Setup
1. Install dependencies
   ```bash
   cd backend
   npm install
   ```
2. (Optional) create a `.env` file to override defaults
   ```env
   PORT=3000        # HTTP port the API listens on
   UPLOAD_DIR=uploads # Directory for uploaded files
   ```
3. Start the server
   ```bash
   npm start
   ```
   The API becomes available on **http://localhost:3000** and serves files from `/uploads`.

### Frontend Setup
1. Install dependencies
   ```bash
   cd frontend
   npm install
   ```
2. (Optional) create a `.env` file
   ```env
   VITE_API_URL=http://localhost:3000 # Base URL of the backend API
   ```
3. Start the dev server
   ```bash
   npm run dev
   ```
   Vite runs on **http://localhost:5173**.

To build the production bundle:
```bash
npm run build
```
The static files will be output to `frontend/dist/`.

## Usage & Features
1. Visit the frontend in a browser.
2. **Register** or **log in** with an email and password.
3. After authentication you can:
   - Publish posts with text and optional media files.
   - Like and comment on posts.
   - View your profile data including follower/following counts.
   - Follow or unfollow other users (currently via API calls).

Uploads are saved under `backend/uploads/` and can be accessed at `http://localhost:3000/uploads/<filename>`.

## API Reference
### Authentication
| Method & Route | Body | Description |
|----------------|------|-------------|
| `POST /auth/register` | `{ email, password }` | Create a new account. |
| `POST /auth/login` | `{ email, password }` | Authenticate a user. |
| `GET /auth/google` | – | Placeholder for Google OAuth. |
| `GET /auth/discord` | – | Placeholder for Discord OAuth. |

### Users
| Method & Route | Body | Description |
|----------------|------|-------------|
| `GET /users/:id` | – | Retrieve public profile info. |
| `POST /users/:id/follow` | `{ followerId }` | Follow a user. |
| `POST /users/:id/unfollow` | `{ followerId }` | Unfollow a user. |

### Posts
| Method & Route | Body | Description |
|----------------|------|-------------|
| `GET /posts` | – | List all posts. |
| `POST /posts` | `multipart/form-data { userId, text, file? }` | Create a post with optional media. |
| `POST /posts/:id/like` | `{ userId }` | Like a post. |
| `POST /posts/:id/comments` | `{ userId, text }` | Add a comment to a post. |

## Environment Variables
| Variable | Location | Default | Purpose |
|----------|----------|---------|---------|
| `PORT` | `backend/.env` | `3000` | Port for the API server. |
| `UPLOAD_DIR` | `backend/.env` | `uploads` | Directory where uploaded media is stored. |
| `VITE_API_URL` | `frontend/.env` | `http://localhost:3000` | Backend base URL used by the frontend. |

## Deployment Notes
1. **Backend**
   - Ensure Node.js is installed on the server.
   - Install dependencies (`npm install`) and start with `npm start`.
   - Serve the `/uploads` directory if media uploads are required.
2. **Frontend**
   - Build the static bundle with `npm run build`.
   - Deploy the contents of `frontend/dist/` to any static host (e.g. Nginx, Vercel).
   - Configure `VITE_API_URL` to point at the public URL of the backend.

## License
MIT
