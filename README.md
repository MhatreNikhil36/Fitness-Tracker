# Personalized Fitness Tracker Frontend

## Phase 2 - Readme

### Group 11 Members:

1. Alekhya Yalagonda (1002210903)
2. Elizabeth Wanyonyi (1002200288)
3. Kaushal Vibhakar (1002242382)
4. Mohan Krishna Turlapati (1002216058)
5. Nikhil Mhatre (1002122555)

## Hosted Project

### Running with Docker:

1. Build the Docker Image:
   ```
   docker compose build --no-cache
   ```
2. Run the Docker Container:
   ```
   docker compose up
   ```
   The project will now be accessible at: http://localhost:3000


We named our project Fittrack and hosted it on UTA Cloud. You can access the hosted project [here](https://knv2382.uta.cloud/).

### Login Details

The login page allows users to sign in either as Admin or User.

- **Admin Panel:**
  - Username: admin@mavs.uta.edu
  - Password: admin@123
- **User Panel:**
  - Username: user@mavs.uta.edu
  - Password: user@123

## Features Implemented

This React-based application (Fittrack) includes:

- **User Authentication:** Login and signup screens.
- **Activity Logging:** Interface for users to track workouts and progress.
- **Dashboard & Analytics:** Data-driven visualizations for performance insights.
- **Administrator Authentication and Logging:** Interface for administrator to Login and manage workout plans/exercises.
- **Responsive Design:** Mobile & desktop compatibility.

## Pages Developed for This Phase

### User-Facing Pages:

- `/Homepage` & `/` – Landing page.
- `/login` – User login.
- `/signup` – User signup.
- `/Dash` – Main user dashboard with goals, nutrition charts, and recent activity.
- `/nutrition` – AI-generated meal/plan recommendations.
- `/log-nutrition` – Form to track daily calories/macros.
- `/goals` – Goals overview; add new goal at `/addGoal`.
- `/goal-progress/:goalId` – Detailed progress tracking for a specific goal.
- `/logactivity` – Log a workout or activity session.
- `/activity` – View all logged activities.
- `*` – Fallback page (NotFound).

### Admin Pages:

- `/admin` – Admin dashboard (custom nav bar, quick stats).
- `/admin/add-exercise` – Create new exercises (name, muscle group, instructions).
- `/admin/add-workout` – Build workouts (sets, reps, rest time, attach exercises).
- `/admin/add-Ai` – Manage AI prompts (type, prompt text, generated content).

## How to Run This Program

### On Localhost:

1. Install Dependencies:
   ```
   npm install
   ```
2. Start the Development Server:
   ```
   npm start
   ```
   The project will be available at: https://knv2382.uta.cloud/

### Running with Docker:

1. Build the Docker Image:
   ```
   docker compose build --no-cache
   ```
2. Run the Docker Container:
   ```
   docker compose up
   ```
   The project will now be accessible at: http://localhost:3000

## Troubleshooting & Common Errors

1. **Error: "Module Not Found" in React Router:**
   If you encounter:

   ```
   Error: Cannot find module 'react-router-dom'
   ```

   Run the following command:

   ```
   npm install react-router-dom
   ```

2. **Error: Docker Port Already in Use:**
   If you get:
   ```
   docker: Error response from daemon: Conflict. The container name "/Fitnessapp" is already in use
   ```
   Remove the existing container and restart:
   ```
   docker stop Fitnessapp
   docker rm Fitnessapp
   docker run -p 4000:80 --name Fitnessapp fitness-tracker-frontend
   ```

## Notes

- The React project & WordPress files are uploaded to UTA Cloud.
- Additional revisions will be implemented in Phase 3 if required.
