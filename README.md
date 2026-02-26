## fullstack-employee managment system (garduation project)
A full-stack web application for managing employees, departments, and roles efficiently.
## Features
- User authentication (JWT-based)
- Add / Edit / Delete employees
- Department management
- Attendance management
- Payroll management
- Simple leave system
## Tech Stack
### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

## Installation

### 1. Clone the repository
git clone https://github.com/your-username/employee-managment-system.git

### 2. Install server dependencies
cd server
npm install

### 3. Install frontend dependencies
cd ../frontend
npm install

### 4. Create .env file inside server folder
Add:
PORT=5000
MONGODB_URL=mongodb://localhost:27017/ems
JWT_KEY=your_secret_key

### 5. Run the project

Backend:
cd server
npm start

Frontend:
cd frontend
npm run dev
