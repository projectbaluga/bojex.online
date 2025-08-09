# bojex.online

![Build](https://img.shields.io/badge/build-pending-lightgrey)
![Code Style](https://img.shields.io/badge/code_style-prettier-blue)
![License](https://img.shields.io/badge/license-MIT-brightgreen)
![Progress](https://img.shields.io/badge/progress-25%25-orange)

Prototype social platform with a NestJS backend and a React/Vite/Tailwind frontend.

## Features
- Email/password registration and JWT login
- Create text posts with optional media
- Like/unlike and comment on posts
- View profiles and follow/unfollow users

### Limitations
- All data lives in memory and resets on restart
- Frontend demo does not call the API yet
- Comments and likes modules are placeholders; functionality lives in the posts service

## Architecture
- **Backend:** NestJS + TypeScript, multer uploads served from `/uploads`
- **Frontend:** React 18 + Vite + Tailwind CSS components

## Installation & Setup

### Backend (`http://localhost:3000`)
1. `cd backend`
2. `npm install`
3. create `.env`:
   ```env
   PORT=3000
   JWT_SECRET=dev-secret
   MONGO_URI=mongodb://localhost:27017/bojex
   USE_MONGO=false
   ```
4. `npm start`

Uploads land in `backend/uploads/` and are served from `/uploads`.

### Frontend (`http://localhost:5173`)
1. `cd frontend`
2. `npm install`
3. optional `.env`:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
4. `npm run dev`

## Usage
1. Register a user
2. Log in to obtain a JWT
3. Use the token for posts, likes, comments and follows

### Example requests
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

Create post:
```bash
curl -X POST http://localhost:3000/posts \
  -H "Authorization: Bearer <TOKEN>" \
  -F text="Hello" \
  -F media=@image.png
```

Like post:
```bash
curl -X POST http://localhost:3000/posts/<POST_ID>/like \
  -H "Authorization: Bearer <TOKEN>"
```

Comment on post:
```bash
curl -X POST http://localhost:3000/posts/<POST_ID>/comments \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"content":"Nice!"}'
```

Follow user:
```bash
curl -X POST http://localhost:3000/users/<USER_ID>/follow \
  -H "Authorization: Bearer <TOKEN>"
```

## API
### Auth
- `POST /auth/register` – create account
- `POST /auth/login` – return `{ access_token }`
- `POST /auth/google` – 501 placeholder
- `POST /auth/discord` – 501 placeholder

### Users
- `GET /users/:id` – public profile
- `POST /users/:id/follow` – toggle follow/unfollow

### Posts
- `POST /posts` – create post (multipart)
- `GET /posts` – list all posts
- `GET /posts/:id` – view a post
- `POST /posts/:id/like` – like/unlike a post
- `POST /posts/:id/comments` – add a comment

## Project Status
| Area | Progress |
| --- | --- |
| Backend core (auth, posts, comments, likes, follows) | 70% |
| Persistence (DB integration vs in-memory) | 10% |
| Media handling (uploads/serving) | 50% |
| Frontend UI | 40% |
| Frontend ↔ API integration | 0% |
| Testing (unit/e2e) | 0% |
| CI/CD & Deploy | 0% |
| Docs | 30% |
| **Overall** | **25%** |

*Percentages are conservative estimates based on a code scan; no hidden work on DB, tests or CI is assumed.*

## Roadmap
- Integrate frontend with API
- Replace in-memory storage with MongoDB
- Add media validation and storage service
- Implement unit and e2e tests
- Set up CI/CD pipeline
- Deploy preview/staging environment
- Expand documentation and changelog

## Contributing
Contributions are welcome! Fork the repo and open a pull request.

## License
MIT

## Changelog
Coming soon.
