# Fitness Tracker Frontend - Contributor Guide

This document provides everything you need to install, run, and contribute to the Fitness Tracker Frontend repository. Follow the steps below to set up your development environment both with and without Docker, and refer to the best practices section to ensure consistent contributions.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installing Dependencies](#installing-dependencies)
- [Running the App Locally (Without Docker)](#running-the-app-locally-without-docker)
- [Docker Build and Run Instructions](#docker-build-and-run-instructions)
- [Git and Code Contribution Best Practices](#git-and-code-contribution-best-practices)
- [Additional Notes](#additional-notes)

---

## Overview

The Fitness Tracker Frontend is built with React and Material UI, and includes the following key pages:

1. **AuthForm Page:**  
   - Handles both login and signup functionalities with fields matching our user schema, including social login options.

2. **NutritionPage:**  
   - Displays AI-generated nutrition recommendations and a sample meal plan based on user health metrics and goals.

3. **LogNutritionPage:**  
   - Allows users to log their daily nutritional intake (e.g., calories, protein, carbs, fats) for tracking purposes.

4. **GoalsPage:**  
   - Enables users to select a predefined goal type (Lose Weight, Gain Muscle, Add Weight) and set associated target values, statuses, and deadlines.

5. **DashboardPage:**  
   - Consolidates user data such as goals, progress, and nutrition metrics, visualized with interactive charts and animations (using Recharts).

All pages adhere to our Material UI theme: a white background, black text, and red highlights for primary actions.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js and npm:** [Download Node.js](https://nodejs.org/)
- **Git:** [Download Git](https://git-scm.com/)
- **Docker (Optional):** [Download Docker Desktop](https://www.docker.com/products/docker-desktop) if you want to run the app in a containerized environment.

---

## Installing Dependencies

Clone the repository and install the dependencies by running the following commands in your terminal:

```bash
# Clone the repository
git clone https://github.com/your-org/fitness-tracker-frontend.git
cd fitness-tracker-frontend

# Install Node.js dependencies
npm install

# Install Recharts for data visualization (if not already installed)
npm install recharts
```

---

## Running the App Locally (Without Docker)

After installing the dependencies, you can run the development server with hot-reloading:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Docker Build and Run Instructions

The repository includes a multi-stage Dockerfile that supports both development (with hot-reloading) and production builds.

### Development with Docker (Hot-Reloading)

1. **Build the Development Image:**

   - On **Windows (CMD)**:
     ```bash
     docker build --target dev -t my-app:dev .
     docker run -p 3000:3000 -v %cd%:/app my-app:dev
     ```
   - On **PowerShell**:
     ```bash
     docker build --target dev -t my-app:dev .
     docker run -p 3000:3000 -v ${PWD}:/app my-app:dev
     ```

   The app will be running on [http://localhost:3000](http://localhost:3000) with hot-reloading enabled.

### Production with Docker

1. **Build the Production Image:**

   ```bash
   docker build --target prod-server -t my-app:prod .
   ```

2. **Run the Production Container:**

   ```bash
   docker run -p 80:80 my-app:prod
   ```

   The app will be accessible at [http://localhost](http://localhost).

---

## Git and Code Contribution Best Practices

1. **Branching Strategy:**
   - Always create a new branch for your feature or bug fix:
     ```bash
     git checkout -b feature/your-feature-name
     ```
   - Keep your branch up-to-date with the main branch by regularly pulling changes.

2. **Commit Messages:**
   - Write clear, concise commit messages that describe the changes made.
   - Example:
     ```
     feat: add GoalsPage with preset goal types and deadline input
     fix: update API endpoint for nutrition logging
     ```

3. **Code Style and Linting:**
   - Follow the existing code style and conventions.
   - Run the linter before committing to ensure code consistency:
     ```bash
     npm run lint
     ```

4. **Pull Requests:**
   - Submit pull requests with a clear description of changes.
   - Link relevant issues and add screenshots if UI changes are involved.
   - Ensure your PR passes all tests and builds successfully.

---

## Additional Notes

- **API Integration:**  
  Replace dummy data in components (e.g., `NutritionPage`, `DashboardPage`) with actual API calls to your backend. Update endpoints as necessary.

- **Environment Variables:**  
  Use environment variables for any sensitive configuration or API URLs. Consider adding a `.env.example` file.

- **Documentation:**  
  Update this guide and in-code comments as new features are added.

- **Communication:**  
  If you run into any issues or have questions, please reach out to the team via our teams channel or GitHub Issues.

