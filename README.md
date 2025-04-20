# Personalized Fitness Tracker

## Phase 3 - Readme

### Group 11 Members:

1. Alekhya Yalagonda (1002210903)
2. Elizabeth Wanyonyi (1002200288)
3. Kaushal Vibhakar (1002242382)
4. Mohan Krishna Turlapati (1002216058)
5. Nikhil Mhatre (1002122555)

## Hosted Project

We named our project Fittrack and hosted it on UTA Cloud. You can access the hosted project [here](https://knv2382.uta.cloud/).

### Running with Docker:

1. Build the Docker Image:
   ```bash
   docker compose build --no-cache
   ```
2. Run the Docker Container:
   ```bash
   docker compose up
   ```
   The project will now be accessible at:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Login Details

The login page allows users to sign in either as Admin or User.

- **Admin Panel:**
  - Username: admin@mavs.uta.edu
  - Password: admin@123
- **User Panel:**
  - Username: user@mavs.uta.edu
  - Password: user@123

## Features Implemented

This phase primarily focused on **backend feature expansion** along with integration into the frontend pages. Major enhancements included:

- **JWT Authentication & Secure Routing:**

  - Token-based login/signup for both users and admins.
  - Middleware (`verifyToken.js`) added to protect sensitive routes.

- **Activity Logging:**

  - Log workouts and exercises.
  - Track completion status.
  - View complete history of user activities.

- **Goal Management:**

  - Create, update, delete goals.
  - Fetch progress metrics.
  - Integrated analytics with charts.

- **AI-Powered Nutrition System:**

  - Gemini 2.0 Flash-Lite model integrated via backend.
  - Personalized meal recommendations.
  - Responses cached to reduce repeated API calls.

- **Analytics Dashboard:**

  - Backend APIs serve goal, nutrition, and activity data.
  - Frontend uses Recharts to visualize analytics.

- **Admin Control Panel Enhancements:**
  - Add/edit exercises and workouts.
  - Manage Gemini prompt templates for nutrition AI.

## Backend Files Added in This Phase

A majority of the work was implemented on the server side. Key backend files include:

### 📁 Controllers:

- `addExerciseController.js`
- `addWorkoutController.js`
- `goalsController.js`
- `goalProgressController.js`
- `nutritionController.js`
- `aiPromptsController.js`
- `messageController.js`
- `workoutsController.js`
- `authController.js`
- `googleAuth.js`
- `adminController.js`

### 🛣️ Routes:

- `addExerciseRoute.js`
- `addWorkoutRoute.js`
- `goals.js`
- `goalProgress.js`
- `nutrition.js`
- `aiPrompts.js`
- `messageRoutes.js`
- `workoutRoutes.js`
- `authRoutes.js`
- `adminRoute.js`
- `exerciseCategoriesRoute.js`

### 🧩 Middleware:

- `verifyToken.js` – Secures routes using JWT.

## Pages Developed for This Phase

### User-Facing Pages:

- `/login` – Login page.
- `/signup` – Signup page.
- `/dash` – Dashboard showing analytics and overview.
- `/nutrition` – AI-generated nutrition suggestions.
- `/log-nutrition` – Log meals and macros.
- `/goals` – Goals list.
- `/addGoal` – Add a new goal.
- `/goal-progress/:goalId` – Track progress for a specific goal.
- `/logactivity` – Log workouts and exercises.
- `/activity` – View all completed activities.

### Admin Pages:

- `/admin` – Admin dashboard.
- `/admin/add-exercise` – Create new exercises.
- `/admin/add-workout` – Build workout plans.
- `/admin/add-Ai` – Manage Gemini AI prompts.

## How to Run This Program

### On Localhost:

1. Install Dependencies:
   ```bash
   npm install
   ```
2. Start the Development Server:
   ```bash
   npm start
   ```
   The project will be available at: http://localhost:3000

### Running with Docker:

1. Build the Docker Image:
   ```bash
   docker compose build --no-cache
   ```
2. Run the Docker Container:
   ```bash
   docker compose up
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Troubleshooting & Common Errors

1. **Error: "Module Not Found" in React Router:**
   If you encounter:

   ```bash
   Error: Cannot find module 'react-router-dom'
   ```

   Run:

   ```bash
   npm install react-router-dom
   ```

2. **Error: Docker Port Already in Use:**
   If you get:
   ```bash
   docker: Error response from daemon: Conflict. The container name "/Fitnessapp" is already in use
   ```
   Run:
   ```bash
   docker stop Fitnessapp
   docker rm Fitnessapp
   docker run -p 4000:80 --name Fitnessapp fitness-tracker-frontend
   ```

## Notes

- This phase emphasized backend development with robust API integration and middleware protection.
- Gemini AI integration is modular for future expansion.
- Backend structure is organized with clear separation of concerns via controllers and routes.
