# 🚀 devsConnect

**devsConnect** is a developer networking platform where users can connect, chat, and build meaningful professional relationships. It allows users to discover other developers, send connection requests, and communicate in real time.


## 🌐 Live Demo

👉 **Live Link:** 

---

## 🎥 UI Overview

👉 **Watch UI Demo Video:** 


## ✨ Features

* 🔐 User signup and login
* 🤝 Send, accept, and reject connection requests
* 🔍 View matches and connections
* 👤 Update user profile and change password
* 💬 Real-time chatting using Socket.IO
* 🧠 State management with Redux Toolkit
* 🌐 Client-side routing with React Router DOM
* 📡 API handling with Axios


## 🛠️ Tech Stack

### Frontend

* React
* React Router DOM
* Redux Toolkit
* Axios
* Tailwind CSS

### Backend

* Node.js
* MongoDB
* JSON Web Token (JWT)
* Bcrypt
* Crypto (Hashing)
* Socket.IO (Real-time chat)


## 📁 Project Structure

devsConnect/
│
├── backend/        # Node.js backend
├── frontend/        # React frontend
├── README.md
```


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/proshantosutradhar/devsConnect.git
cd devsConnect
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the server folder and add:

```
PORT=5000
DATABASE=your_mongodb_connection_string
KEY=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔗 API Overview

# authRouter

- POST /signin
- POST /login
- POST /logout

# profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# connectionRequestRouter
- Status: interested, ignored, 
- POST /request/send/:status/:userid

- Status: accepted, rejected
- POST /request/review/:status/:requestId


# userRouter

- GET /user/connections/matches
- GET /user/requests/received
- GET /user/feed

# chat
- GET /chat/:userId

---

## 📌 Future Improvements

* 📨 Notifications system
* 📱 New message notification
* 🌍 Chat optimizations
* 🔐 Email otp verification

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 💡 Author

Developed by **Proshanto Sutradhar**

---

⭐ If you like this project, feel free to give it a star!
