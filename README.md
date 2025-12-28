# 🏋️‍♂️ Workout Logger

> A production-ready MERN stack fitness tracking application with advanced analytics and data visualization.

**🔗 Live Demo:** [workoutlogger.vercel.app](https://workout-logger-three.vercel.app/)  
**💻 Tech Stack:** React • Node.js • Express • MongoDB • JWT • Tailwind CSS • Recharts

[![Deployment Status](https://img.shields.io/badge/status-live-brightgreen)](https://workout-logger-three.vercel.app/)
[![Backend](https://img.shields.io/badge/backend-render-blue)](https://workout-logger-backend-wyt7.onrender.com/)

---

## 📸 Screenshots

<!-- SCREENSHOTS  will be added HERE -->
*(Dashboard, Workout List, Analytics, etc.)*

---

## 🎯 Why I Built This

After 3.5 years as an SDET, I realized my passion was in **building products**, not just testing them. I took a focused year to:

- ✅ Master full-stack development (MERN stack)
- ✅ Complete 200+ algorithmic problems (LeetCode Neetcode 150)
- ✅ Build this production-ready application from scratch

**This project showcases:**
- Complex backend logic (MongoDB aggregation pipelines, JWT authentication)
- RESTful API design with defensive error handling
- Modern React patterns with hooks and context
- Data visualization and analytics
- Real-world problem-solving (ISO week calculations, workout streaks)

---

## ✨ Key Features

### 🔐 **Authentication System**
- User signup/login with JWT
- Password reset via email (Nodemailer)
- Secure token-based sessions
- Protected routes on frontend and backend

### 📝 **Workout Management**
- Create workouts with multiple exercises
- Track sets, reps, weight, duration, calories
- Edit and delete workouts
- Search and filter workout history
- Pagination for large datasets

### 📊 **Advanced Analytics**

#### 1️⃣ Workout Distribution (Pie Chart)
- Breakdown by workout type (Strength, Cardio, HIIT, Yoga)
- Percentage contribution and calorie analysis
- Filterable by week, month, or custom date range

#### 2️⃣ Workout Trends (Bar Chart)
- 8-week activity trends
- Track workout frequency, calories, and duration
- Visualize progress over time

#### 3️⃣ Personal Records Dashboard
- Longest workout duration
- Highest calorie burn in a single session
- Current and longest workout streaks
- Lifetime statistics (total workouts, calories, duration)
- Most active day and week

---

## 🛠️ Tech Stack

### **Frontend**
```
React 18 • React Router • Tailwind CSS
Axios • Recharts • Lucide Icons
```

### **Backend**
```
Node.js • Express.js • MongoDB (Atlas)
Mongoose • JWT • bcrypt • Nodemailer
```

### **DevOps**
```
Frontend: Vercel
Backend: Render (Free Tier)
Database: MongoDB Atlas
```

---

## 🏗️ Technical Highlights

### **Backend Architecture**
- RESTful API with clear separation of concerns
- Middleware-based authentication
- MongoDB aggregation pipelines for analytics:
  - `$group` for type breakdown
  - `$dateToString` + `$week` for trends
  - Complex streak calculation algorithm
- Proper HTTP status codes (200, 400, 401, 404, 500)
- Defensive coding for empty datasets

### **Frontend Patterns**
- React Hooks (useState, useEffect, custom hooks)
- Protected routes with React Router
- Centralized API calls with Axios interceptors
- Responsive design with Tailwind CSS
- Chart.js/Recharts for data visualization
- Form validation and error handling

### **Data Structures & Algorithms**
- ISO week date calculations
- Consecutive day streak algorithm
- Pagination logic
- Sorting and filtering workouts
- Optimized re-renders with React.memo

---

## 📡 API Endpoints

**Base URL:** `https://workout-logger-backend-wyt7.onrender.com/`

### Authentication
```http
POST   /api/auth/signup                    # User registration
POST   /api/auth/login                     # User login
POST   /api/auth/forgotpassword            # Request password reset
POST   /api/auth/reset-password/:token     # Reset password
```

### Workouts (Protected)
```http
GET    /api/workouts                       # Get all user workouts
POST   /api/workouts                       # Create workout
GET    /api/workouts/:id                   # Get single workout
PUT    /api/workouts/:id                   # Update workout
DELETE /api/workouts/:id                   # Delete workout
```

### Analytics (Protected)
```http
GET    /api/workouts/stats/type-breakdown           # Workouts by type
GET    /api/workouts/stats/get-weekly-trends        # 8-week trends
GET    /api/workouts/stats/getPersonalRecordsStats  # Personal records
```

---

## 📁 Project Structure

```
workout-logger/
├── frontend/
│   ├── src/
│   │   ├── api/           # API endpoints configuration
│   │   ├── assets/        # Images, icons
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page-level components
│   │   └── utils/         # Helper functions, validators
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth, error handling
│   │   └── utils/         # Date helpers, validators
│   └── server.js
│
└── README.md
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install

# Create .env file
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
EMAIL_USER=your_gmail
EMAIL_PASS=your_gmail_app_password

npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

- **API Testing:** Postman collection with 20+ test cases
- **Manual Testing:** Comprehensive UI flow testing
- **Edge Cases:** Empty states, invalid inputs, expired tokens
- **Browser Testing:** Chrome, Firefox, Safari

---

## 🎓 What I Learned

### Technical Skills
- MongoDB aggregation pipelines and complex queries
- JWT authentication and security best practices
- React state management and performance optimization
- RESTful API design principles
- Date manipulation and ISO week standards
- Chart.js/Recharts for data visualization
- Deployment on Vercel and Render

### Soft Skills
- Breaking down complex features into manageable tasks
- Debugging production issues
- Writing maintainable, documented code
- Planning database schemas for scalability
- User experience design decisions

---

## 🚧 Challenges Overcome

1. **ISO Week Date Calculations**
   - Challenge: ISO week 1 is the week containing Jan 4
   - Solution: Implemented custom date utility functions

2. **Workout Streak Algorithm**
   - Challenge: Calculate consecutive workout days
   - Solution: Efficient O(n) algorithm with date comparison

3. **MongoDB Aggregations**
   - Challenge: Complex grouping for analytics
   - Solution: Mastered `$group`, `$project`, `$sort` pipelines

4. **Authentication Flow**
   - Challenge: Secure token storage and validation
   - Solution: JWT with httpOnly cookies and localStorage

---

## 🔮 Future Enhancements

- [ ] Social features (share workouts, follow friends)
- [ ] Workout templates and routine builder
- [ ] Progressive Web App (PWA) support
- [ ] Exercise library with instructions
- [ ] Integration with fitness APIs (Fitbit, Google Fit)
- [ ] Dark mode
- [ ] Export data to CSV/PDF

---

## 🤝 Contributing

This is a personal project built for learning, but feedback is welcome!

---

## 📧 Contact

**Parwinder Singh**  
📧 Email: bhangupawindersingh31@gmail.com  
💼 LinkedIn: [linkedin.com/in/yourprofile](https://www.linkedin.com/in/parwinder-singh-408027159/)  
🐙 GitHub: [github.com/bhangu-creator](https://github.com/bhangu-creator)

---

## 📄 License

MIT License - feel free to use this code for learning purposes.

---

## 🙏 Acknowledgments

- Built during my transition from SDET to Full-Stack Developer
- Inspired by my actual fitness journey and real-world fitness tracking needs
- Thanks to the open-source community for amazing tools and libraries

---

**⭐ If you found this project helpful, please star the repo!**