# Installation Guide for bojex.online

This guide explains how to run the project using Docker.

## Requirements
- Docker
- Docker Compose
- Git

## 1. Clone the Repository
```bash
git clone https://example.com/bojex.online.git
cd bojex.online
```

## 2. Build and Start the Stack
Use Docker Compose to build images and launch MongoDB, the backend, and the frontend:
```bash
docker compose up --build
```
The backend is available at http://localhost:3000 and the frontend at http://localhost:5173.

## 3. Running Tests
Run the backend and frontend test suites inside their containers:
```bash
docker compose run --rm backend npm test
docker compose run --rm frontend npm test
```

## 4. Rebuilding Images
When dependencies change, rebuild all images with:
```bash
docker compose build
```

## 5. Troubleshooting
- Ensure the Docker daemon is running.
- If ports `3000` or `5173` are in use, stop the conflicting service or change the mapping in `docker-compose.yml`.

You're ready to develop and experiment with bojex.online!

