# Employee Management System

A full-stack **Employee Management System** built using the **MERN stack**. The application provides role-based access for **Admins, Managers, and Employees** and manages employee approval, team assignment, task creation, task submission, and task review workflows.

## Live Demo

**Frontend:** employee-management-system-ten-amber.vercel.app

**Backend API:** YOUR_RENDER_URL

## GitHub

**Repository:** https://github.com/Siddhesh-Agare/employee-management-system

---

## Features

### Admin

* Secure admin authentication
* Create manager accounts
* View pending employees
* View assigned employees
* Assign employees to managers
* Manage employee approval workflow
* View system overview
* Manage manager and employee relationships

### Manager

* Secure manager authentication
* View assigned employees
* Approve employees
* Reject employees
* Create tasks for assigned employees
* View created tasks
* Track task progress
* Review submitted tasks
* Approve completed tasks
* Request changes with feedback

### Employee

* Employee registration
* Pending account approval workflow
* Secure employee authentication
* View assigned tasks
* Start assigned tasks
* Continue tasks when changes are requested
* Submit task responses
* View manager feedback
* Track task status

---

## Role-Based Workflow

```text
                         ADMIN
                           |
              +------------+------------+
              |                         |
       Create Managers            Assign Employees
                                        |
                                        v
                                    MANAGER
                                        |
                       +----------------+----------------+
                       |                                 |
                 Approve/Reject                    Create Tasks
                       |                                 |
                       v                                 v
                   EMPLOYEE <------------------------ TASK
                       |
                       v
                  Start Task
                       |
                       v
                  In Progress
                       |
                       v
                   Submitted
                       |
                       v
                 Manager Review
                   /         \
                  /           \
            Reviewed       Changes Required
                               |
                               v
                          In Progress
                               |
                               v
                            Submitted
```

---

## Task Status Workflow

```text
Assigned
   |
   v
In Progress
   |
   v
Submitted
   |
   +---------------> Reviewed
   |
   +---------------> Changes Required
                            |
                            v
                       In Progress
                            |
                            v
                         Submitted
```

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

### Deployment

* Vercel - Frontend
* Render - Backend
* MongoDB Atlas - Database
* GitHub - Version Control

---

## Project Architecture

```text
Frontend
   |
   | HTTP Requests / REST API
   v
Express.js Backend
   |
   +---- Authentication & Authorization
   |
   +---- Admin APIs
   |
   +---- Manager APIs
   |
   +---- Employee APIs
   |
   v
MongoDB Atlas
```

---

## Project Structure

```text
Employee-Management-System/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── manager/
│   │   │   └── employee/
│   │   │
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   │
│   ├── scripts/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Authentication

The application uses **JWT-based authentication** and **bcrypt password hashing**.

### Authentication Flow

```text
User Login
    |
    v
Validate Email & Password
    |
    v
Compare Password using bcrypt
    |
    v
Generate JWT
    |
    v
Frontend Stores Token
    |
    v
Axios Sends Bearer Token
    |
    v
Authentication Middleware
    |
    v
Find Authenticated User
    |
    v
Role Authorization
    |
    v
Protected Controller
```

---

## Role-Based Authorization

The application has three main roles:

```text
admin
manager
employee
```

Protected routes use authentication and role-based authorization middleware.

### Role Permissions

```text
Admin
 ├── Create Manager
 ├── Assign Employee
 └── Manage Employees

Manager
 ├── Manage Assigned Employees
 ├── Create Tasks
 └── Review Tasks

Employee
 ├── View Tasks
 ├── Update Task Status
 └── Submit Task Response
```

---

## Employee Registration Workflow

Employees can register through the public registration page.

A newly registered employee receives:

```text
role: employee
status: pending
```

A pending employee cannot log in until approved.

The employee can then be assigned to a manager.

```text
Employee Registration
        |
        v
     Pending
        |
        v
Manager Assignment
        |
        v
Manager Approval
        |
        v
      Active
        |
        v
     Employee Login
```

---

## Task Management

Managers can create tasks for employees assigned to their team.

Each task contains information such as:

* Task title
* Task description
* Assigned employee
* Assigned manager
* Due date
* Task status
* Employee response
* Manager feedback

### Task Review

After an employee submits a task, the manager can approve the task:

```text
Submitted → Reviewed
```

Or request changes:

```text
Submitted → Changes Required
```

The employee can then continue the task:

```text
Changes Required
       |
       v
In Progress
       |
       v
Submitted
```

---

## API Structure

The backend provides REST API routes for different roles.

```text
/api/auth
/api/user
/api/admin
/api/manager
/api/employee
```

Authentication and authorization middleware protect the required routes.

---

## Security

The application implements several security practices:

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Role-based authorization
* Environment variables for sensitive configuration
* MongoDB credentials stored outside source code
* Secure admin credentials through environment variables
* Bearer token authentication
* Account status validation before authentication

---

## Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### Frontend

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

For production, the frontend environment variable should contain the deployed backend URL.

> **Important:** Never commit `.env` files containing secrets to GitHub.

---

## Installation

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Employee-Management-System
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Backend Environment Variables

Create:

```text
backend/.env
```

Add the required environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### 4. Start the Backend

```bash
npm start
```

The backend will run locally on:

```text
http://localhost:5000
```

### 5. Install Frontend Dependencies

Open another terminal and run:

```bash
cd frontend
npm install
```

### 6. Configure Frontend Environment Variables

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

### 7. Start the Frontend

```bash
npm run dev
```

The frontend will be available at the local URL provided by Vite, typically:

```text
http://localhost:5173
```

---

## Deployment

### Frontend

The React frontend is deployed using **Vercel**.

```text
React + Vite
     |
     v
  Vercel
```

### Backend

The Node.js/Express backend is deployed using **Render**.

```text
Node.js + Express
        |
        v
      Render
```

### Database

**MongoDB Atlas** is used as the cloud database.

```text
Vercel
   |
   v
Render API
   |
   v
MongoDB Atlas
```

---

## Demo Workflow

The application can be demonstrated using the following workflow:

```text
1. Login as Admin
        ↓
2. Create Manager
        ↓
3. Register Employee
        ↓
4. Assign Employee to Manager
        ↓
5. Login as Manager
        ↓
6. Approve Employee
        ↓
7. Create Task
        ↓
8. Login as Employee
        ↓
9. Start Task
        ↓
10. Submit Task Response
        ↓
11. Login as Manager
        ↓
12. Review Task
        ↓
13. Request Changes
        ↓
14. Login as Employee
        ↓
15. Continue Task
        ↓
16. Submit Again
```

---

## Future Improvements

Potential improvements for the system include:

* Email notifications
* Password reset functionality
* Profile management
* Task priority levels
* Task attachments
* Advanced task filtering
* Dashboard analytics
* Pagination
* Search functionality
* Activity logs
* Real-time notifications
* Automated testing
* CI/CD pipeline

---

## License

This project is available for educational and development purposes.
