# bojex.online

bojex.online is a modern content sharing platform where users can upload and interact with gaming clips, memes, tech articles and other random fun content.

This repository currently provides a small prototype consisting of:

- **backend/** – a minimal [NestJS](https://nestjs.com/) application using TypeScript.
- **frontend/** – a simple [React](https://react.dev/) application bootstrapped with [Vite](https://vitejs.dev/).

The prototype is intended as a starting point for building the full platform described below. Many features are not implemented yet.

## Planned Features

- Authentication with email/password and OAuth (Google, Discord)
- Media uploads for clips, images/GIFs, and tech posts
- Public user profiles with follow system
- Comments, likes and reports
- Feed with search and filtering
- Admin dashboard for moderation and analytics

## Development

### Backend

```
cd backend
npm install
npm start
```

The default server listens on `http://localhost:3000`.

### Frontend

```
cd frontend
npm install
npm run dev
```

The dev server starts on `http://localhost:5173` by default.

## License

MIT
