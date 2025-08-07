# bojex.online

## Project Overview
bojex.online is a modern content sharing platform where users can upload and interact with gaming clips, memes, tech articles and other random fun content. The codebase is a full‑stack TypeScript prototype intended to grow into a complete social site.

### Tech Stack
- **Frontend:** React with Vite
- **Backend:** NestJS
- **Database:** MongoDB (planned)
- **Runtime:** Node.js

## Installation
1. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. **Configure environment variables**
   Create `.env` files in each package as needed:
   ```bash
   # backend/.env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/bojex
   JWT_SECRET=super-secret

   # frontend/.env
   VITE_API_URL=http://localhost:3000
   ```
3. **Run the app locally**
   ```bash
   # start backend
   cd backend
   npm start

   # start frontend
   cd ../frontend
   npm run dev
   ```
   The backend listens on `http://localhost:3000` and the frontend on `http://localhost:5173`.

## Usage Guide
- **Register** a new user via `POST /auth/register` with `{ "email": "test@example.com", "password": "pass" }`.
- **Log in** using `POST /auth/login`.
- **Create posts** by sending text and an optional file to `POST /posts`.
- **Like** posts with `POST /posts/:id/like` and **comment** using `POST /posts/:id/comments`.
- **View profiles** through `GET /users/:id` and **follow** other users via `POST /users/:id/follow`.

## Folder / File Structure
```
backend/   NestJS REST API and file uploads
frontend/  React single‑page application
```
Each backend module lives under `backend/src/` (e.g., `auth`, `posts`, `users`). Static uploads are stored in `backend/uploads/`.

## API Reference
| Method | Route | Description |
| ------ | ----- | ----------- |
| POST   | /auth/register        | Register a new user |
| POST   | /auth/login           | Log in a user |
| GET    | /auth/google          | Google OAuth placeholder |
| GET    | /auth/discord         | Discord OAuth placeholder |
| GET    | /posts                | List all posts |
| POST   | /posts                | Create a post with optional media |
| POST   | /posts/:id/like       | Like a post |
| POST   | /posts/:id/comments   | Comment on a post |
| GET    | /users/:id            | Fetch a user profile |
| POST   | /users/:id/follow     | Follow a user |

## Environment Variables
| Variable | Description |
| -------- | ----------- |
| `PORT` | Port number for the backend server |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `VITE_API_URL` | Backend URL consumed by the frontend |

## Deployment Notes
- **Frontend:** `npm run build` inside `frontend/` produces a `dist/` folder ready for platforms like Vercel or Netlify.
- **Backend:** deploy the `backend/` service to providers such as Railway, Render, or a custom VPS and ensure all environment variables are set.

## Contributing Guide
1. Fork the repository and create a feature branch.
2. Run the backend and frontend tests (`npm test`) before committing.
3. Submit a pull request with a clear description of changes.

## Credits & License
This project is built with [NestJS](https://nestjs.com/), [React](https://react.dev/), and other open‑source packages. Licensed under the [MIT](./LICENSE) license.
