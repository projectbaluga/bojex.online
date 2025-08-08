#!/usr/bin/env bash
set -e

# Simple helper script to install dependencies for both backend and frontend

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is required but was not found. Please install Node.js and npm." >&2
  exit 1
fi

# Install backend dependencies
if [ -d "backend" ]; then
  echo "Installing backend dependencies..."
  (cd backend && npm install)
else
  echo "Backend directory not found, skipping backend install." >&2
fi

# Install frontend dependencies
if [ -d "frontend" ]; then
  echo "Installing frontend dependencies..."
  (cd frontend && npm install)
else
  echo "Frontend directory not found, skipping frontend install." >&2
fi

echo "Installation complete."
