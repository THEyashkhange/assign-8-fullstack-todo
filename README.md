# Assignment 8 – Full Stack To-Do List Application

This repository contains a complete full-stack To-Do List application developed as part of Assignment 8. The project includes both backend and frontend code maintained in a single repository using a monorepo structure.

---

## Project Overview

The objective of this assignment was to implement previously planned To-Do List APIs using Node.js, Express.js, and MongoDB, and then integrate those APIs with a React frontend to build a fully functional application.

The backend handles all task-related operations, while the frontend provides a user-friendly interface for interacting with the APIs.

---

## Repository Structure


- `todo-backend` contains the Node.js, Express, and MongoDB backend
- `todo-frontend` contains the React frontend application

Each folder includes its own README with detailed setup instructions.

---

## Backend Description

The backend is built using Node.js and Express.js with MongoDB as the database. It exposes RESTful APIs to perform CRUD operations on tasks, including creating tasks, fetching tasks, updating task status, and deleting tasks.

A controller–route–model structure is followed to ensure clean code organisation and maintainability.

---

## Frontend Description

The frontend is developed using React and integrates with the backend APIs using Axios. It allows users to add new tasks, view existing tasks, update task completion status, and delete tasks. The UI updates dynamically based on responses received from the backend.

---

## Local Setup (Brief)

### Backend
1. Navigate to `todo-backend`
2. Install dependencies using `npm install`
3. Add required environment variables in `.env`
4. Start the server using `npm start`

### Frontend
1. Navigate to `todo-frontend`
2. Install dependencies using `npm install`
3. Start the application using `npm start`

Detailed steps are available in the respective README files.

---

## Deployment

- The backend is deployed on **Render**
- The frontend is deployed on **Netlify**

This deployment setup reflects a real-world full-stack application environment.

---

## Challenges Faced

Some challenges encountered during this assignment included configuring MongoDB connections securely, handling asynchronous API calls, and integrating the frontend with the backend APIs. These were resolved by using environment variables, proper error handling, and structured API integration using Axios.

---

## Conclusion

This assignment provided practical experience in building, integrating, and deploying a full-stack web application. It reinforced concepts such as RESTful API design, frontend-backend communication, and real-world deployment workflows.

---

## Submission Links

- GitHub Repository: (this repository)
- Backend Deployment (Render): Added in submission
- Frontend Deployment (Netlify): Added in submission
