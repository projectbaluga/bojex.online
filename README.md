# bojex.online

Prototype social platform with a NestJS backend and a React/Vite/Tailwind frontend.

## Monorepo

This repository uses npm workspaces:

- `backend` – NestJS API
- `frontend` – React client

## Requirements

- Node.js 18 (see `.nvmrc`)
- npm 9+

## Getting Started

1. Install dependencies
   ```bash
   npm install
   ```
2. Setup environment variables
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
3. Run the apps
   ```bash
   npm start -w backend
   npm run dev -w frontend
   ```

## Scripts

- `npm run lint` – run ESLint via each workspace
- `npm run typecheck` – run TypeScript in strict mode
- `npm test` – run tests

## Contributing

Commits use [Conventional Commits](https://www.conventionalcommits.org/). Husky runs lint, typecheck and tests before each commit.

## License

MIT
