# Installation Guide for bojex.online

This guide walks through setting up both the NestJS backend and React frontend for development.

## Requirements
- **Node.js 18+** and **npm**
- (Optional) **MongoDB** – configuration exists but the prototype uses in-memory storage
- Git

## 1. Clone the Repository
```bash
git clone https://example.com/bojex.online.git
cd bojex.online
```

## 2. Automated Installation (Optional)
Run the helper script to install dependencies for both backend and frontend:
```bash
./install.sh
```

## 3. Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file with the following content:
   ```env
   PORT=3000
   JWT_SECRET=your-secret
   MONGO_URI=mongodb://localhost:27017/bojex
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The backend listens on `http://localhost:3000`. Uploaded files are written to `backend/uploads`.

## 4. Frontend Setup
1. In a new terminal, install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 5. Running Tests
Both projects provide placeholder test scripts. Run them to verify your environment:
```bash
cd backend && npm test
cd ../frontend && npm test
```

## 6. Building for Production
To build the frontend for deployment:
```bash
cd frontend
npm run build
```
Output is generated in `frontend/dist`.

Start the backend with `npm start` as described above and serve the built frontend files with a static file server of your choice.

## 7. Troubleshooting
- Ensure environment variables in `.env` are correct.
- If ports `3000` or `5173` are in use, update `PORT` or configure Vite accordingly.

You're ready to develop and experiment with bojex.online!
