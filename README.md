# Healthcare Mini Web Application

A full-stack mini healthcare platform built as part of a Full Stack Developer Internship assignment.

The application allows users to register, log in, submit health assessments, view health analytics, and track their health history over time.

---

## 🚀 Features

- User authentication (Signup / Login) using JWT
- Secure password hashing with bcrypt
- Health assessment form with multiple parameters
- Mock health score calculation & recommendation
- Dashboard with trend-based health analytics (Chart.js)
- Health history with timestamped records
- Clean, responsive UI with animated background
- Deployed on Render

---

## 🛠️ Tech Stack

**Frontend**
- EJS
- CSS (custom, animated gradient UI)
- Chart.js

**Backend**
- Node.js
- Express.js
- JWT Authentication
- bcrypt

**Database**
- MongoDB Atlas (NoSQL)

**Deployment**
- Render

---

## 📸 Screenshots

> Add screenshots of:
- Login page  
- Health dashboard with chart  
- Health history page  

---
🌐 Live Demo

👉 Deployed link: (add Render URL here)
Testing username:
        password:
## ⚙️ Local Setup Instructions

1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>
2. Install dependencies:

npm install

3. Create a .env file:

port=3000
mongodb_uri=your_mongodb_atlas_uri
jwt_secret=your_secret_key

4. Start the app:

npm run dev

5. Open:

http://localhost:3000