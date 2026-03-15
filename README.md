# 🍱 SaveMyFood.com

A full-stack pantry management app that helps users track food expiry dates and reduce waste through automated email alerts.

🔗 **Live Demo:** [savemyfood.onrender.com](https://savemyfood.onrender.com)

---

## Features

- **Authentication** - Register and log in securely with JWT-based auth
- **Pantry Management** - Add items manually with a name and expiry date
- **Automated Email Alerts** - Receive reminder emails 3, 2, and 1 day(s) before an item expires
- **Auto Cleanup** - Expired items are automatically deleted after an expiry notification is sent
- **Daily Cron Job** - Backend runs a scheduled cleanup task every day to process expiring and expired items

---

## Tech Stack

**Backend:** Node.js · Express · MongoDB · Mongoose · Nodemailer
**Frontend:** HTML · CSS · JavaScript  
**Auth:** JWT

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB instance (local or Atlas)
- A Gmail account (or SMTP provider) for Nodemailer

### Installation

```bash
git clone https://github.com/Shadabkhan2004/SaveMyFood.com.git
cd SaveMyFood.com
npm install
```

### Environment Variables

Create a `.env` file in the root of the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### Run

```bash
npm start
```

---

## How It Works

1. Register an account and log in
2. Add pantry items with their expiry dates
3. The app runs a daily background job that checks all items
4. If an item expires in 3 days or fewer, you get a reminder email each day
5. Once an item expires, a final notification is sent and the item is removed from your pantry

---
