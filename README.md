# MERN Todo App

A full-stack MERN (MongoDB, Express, React, Node.js) todo application with a modern UI built using Tailwind CSS. The application supports full CRUD operations with persistent data stored in MongoDB.

## Features
- Create, read, update, and delete todos
- RESTful API using Express and Node.js
- MongoDB for persistent data storage
- React frontend styled with Tailwind CSS
- Environment variable based configuration
- Frontend and backend can be run together using concurrently
- Clear separation of frontend and backend

## Tech Stack

### Frontend
- React
- JavaScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

mern-todo-app/
- frontend/
- backend/
- package.json
- package-lock.json
- README.md

## Prerequisites
- Node.js
- npm
- MongoDB (local or cloud)

## First-Time Setup (Required Once)

Before running the project with a single command, dependencies must be installed once in all directories.

Backend setup:
    ```cd backend```,
    ```npm install```

Frontend setup:
    ```cd frontend```,
    ```npm install```

Root setup:
    ```cd ..```,
    ```npm install```

This installs concurrently and other root-level dependencies.

## Run Project (Single Command)

From the root directory:
    ```npm run dev```

This command uses concurrently to start both the frontend and backend together.

## Alternative: Run Manually

Backend:
   ```cd backend```,
    ```npm run dev```

Frontend:
   ```cd frontend```,
    ```npm run dev```

Run frontend and backend in separate terminals.

## Environment Variables

Backend (backend/.env):
    ```PORT=5000```,
    ```MONGO_URI=your_mongodb_connection_string```

Frontend (frontend/.env):
    ```VITE_API_BASE_URL=your_client_url```

## Purpose

This repository is a showcase project demonstrating full-stack MERN development, REST API design, MongoDB persistence, and modern UI development using Tailwind CSS.

## License
MIT License
