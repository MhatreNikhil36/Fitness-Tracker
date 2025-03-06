# 🏋️ Personalized Fitness Tracker with AI-Based Insights


## How to run
```
docker build --no-cache -t auth-frontend .
docker run -p 3000:80 --name auth-app auth-frontend
```

## 📌 Overview
This project is a **full-stack fitness tracking application** that leverages **AI-driven insights** to provide personalized workout recommendations and fitness analytics. Built with **React (frontend), Next.js (backend), and a SQL/NoSQL database**, this tracker enables users to log activities, set fitness goals, and visualize progress.

## 🚀 Features
- **User Authentication**: Secure login and account management.
- **Activity Logging**: Track workouts, steps, and calories.
- **AI-Powered Recommendations**: Personalized fitness plans using machine learning.
- **Progress Dashboard**: Interactive charts and reports on fitness performance.
- **Responsive UI**: Mobile and desktop-friendly design.
- **API & Database**: Efficient data management with AI-assisted schema generation.

## 🛠️ Tech Stack
### Frontend
- **React** (UI components)
- **Next.js** (for SSR & API routes)
- **Tailwind CSS** (for styling)

### Backend
- **Next.js API Routes**
- **Node.js & Express Middleware**
- **MySQL / MongoDB / PostgreSQL** (Database)

### AI Integrations
- AI-assisted **workout recommendations**
- AI-driven **API testing & debugging**

## 📅 Project Timeline
### **Phase 1: Project Understanding (Jan 13 – Jan 27)**
- Project proposal, feature planning, wireframes, ERD & database schema.

### **Phase 2: Frontend Development (Jan 28 – Feb 25)**
- React UI implementation with AI-assisted code and debugging.

### **Phase 3: Backend Development (Feb 26 – Apr 7)**
- Next.js API, database setup, middleware, AI-driven recommendations.

### **Phase 4: Deployment & Presentation (Apr 8 – May 3)**
- AWS/Vercel deployment, final report, and project presentation.

## 📁 Folder Structure
```
/project-root
│── /frontend         # React (Next.js) app
│── /backend          # API routes & business logic
│── /database         # Schema & seed data
│── /docs             # Project documentation
│── /ai-models        # AI recommendation logic
│── README.md         # Project overview
│── package.json      # Dependencies
│── .gitignore        # Ignored files
```

## ⚡ Installation & Setup
### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-repo/fitness-tracker.git
cd fitness-tracker
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Set up environment variables
Create a `.env` file and add:
```
DATABASE_URL=your_database_connection
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4️⃣ Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📌 Deployment
The app will be deployed on **AWS or Vercel** with a **custom domain**.

## 📄 Contributing
1. **Fork** the repository.
2. **Create a feature branch** (`git checkout -b feature-name`).
3. **Commit changes** (`git commit -m "Added feature"`).
4. **Push to your branch** (`git push origin feature-name`).
5. **Open a Pull Request**.

## 📜 License
This project is licensed under the **MIT License**.
