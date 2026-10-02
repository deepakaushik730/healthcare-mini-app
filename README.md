# Healthcare Mini Web Application

A full-stack mini healthcare platform built as part of a Full Stack Developer Internship assignment.

The application allows users to register, log in, submit health assessments, view health analytics, and track their health history over time.

---

## 🚀 Features

- Secure User Authentication (Signup / Login)
- JWT-based session management
- Password hashing using bcrypt
- Health assessment form with multiple parameters
- Mock AI-based health score & recommendations
- Interactive dashboard with line chart visualizations
- Health history with timestamped records
- Clean, responsive UI with animated gradient background
- Fully deployed on Render

---

## 🛠️ Tech Stack

**Frontend**
- EJS(Embedded JavaScript Templates)
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

> Added screenshots of:
- Login page  
- Health dashboard with chart  
- Health history page  
- New assesment page
---

🌐 Live Demo

👉 Deployed link: https://healthcare-mini-app.onrender.com/
Testing username: asd@gmail.com
        password: asd

## ⚙️ Local Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/deepakaushik730/healthcare-mini-app
2. Install dependencies:

npm install

3. Create a .env file:

port=3000
mongodb_uri=xxxx
jwt_secret=supersecretkey

4. Start the app:

npm run dev

5. Open:

http://localhost:3000

---

## Render + MongoDB Atlas

On Render, set environment variables (Dashboard → your service → **Environment**):

- `mongodb_uri` — full Atlas connection string (`mongodb+srv://...`)
- `jwt_secret` — any long random string

If deploy logs show `querySrv ENOTFOUND _mongodb._tcp.<your-cluster>.mongodb.net`, the hostname in that URI **does not exist in DNS** (typo, renamed cluster, or deleted cluster). Fix it in Atlas, not in code:

1. [MongoDB Atlas](https://cloud.mongodb.com) → **Database** → **Connect** → **Drivers** → copy the current connection string.
2. Paste it into Render as `mongodb_uri` and save (triggers redeploy).
3. **Network Access** → allow access from anywhere (`0.0.0.0/0`) or Render’s egress IPs so the app can reach Atlas.

Update your local `.env` with the same URI so local and production stay in sync.

