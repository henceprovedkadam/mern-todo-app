# MERN Todo App

A full-stack MERN (MongoDB, Express, React, Node.js) todo application with a modern UI built using Tailwind CSS. The application supports full CRUD operations with persistent data stored in MongoDB.

## Demo Video
https://github.com/user-attachments/assets/9bc905a1-28e1-462c-8d8a-4d7efeb40919

## Features
- Full CRUD operations for todos (add, view, edit, delete, update status)
- RESTful API built with Express.js and Node.js
- User authentication (signup, login, logout) with protected routes
- MongoDB for persistent storage of users and todos
- React frontend styled with Tailwind CSS
- Todo filtering on the frontend: **All**, **Completed**, and **Pending**
- Environment-based configuration for development and production
- Clear separation between frontend and backend code

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


## Environment Variables

Backend (backend/.env):
```env
    PORT=your_port_number,
    MONGO_URI=your_mongodb_connection_string
```

Frontend (frontend/.env):
```env
    VITE_API_BASE_URL=your_client_url
```

## First-Time Setup (Required Once)

Before running the project with a single command, dependencies must be installed once in all directories.

Backend setup:
```bash
    cd backend
    npm install
```

Frontend setup:
```bash
    cd frontend
    npm install
```

Root setup:
```bash    
    cd ..
    npm install
```

This installs concurrently and other root-level dependencies.

## Run Project (Single Command)

From the root directory:
    ```npm run dev```

This command uses concurrently to start both the frontend and backend together.

## Alternative: Run Manually

Backend:
   ```cd backend```,
    ```npm start```

Frontend:
   ```cd frontend```,
    ```npm run dev```

Run frontend and backend in separate terminals.

## Purpose

This repository is a showcase project demonstrating full-stack MERN development, REST API design, MongoDB persistence, and modern UI development using Tailwind CSS.

## License
MIT License
