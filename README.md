# Real-Time Chat App - Frontend (React + Socket.IO)

This is the **frontend** for a real-time chat application built with **React** and **Socket.IO**. It connects to the backend to provide live messaging, online users list, and chat functionality similar to Instagram DMs.

---

## Features

- Real-time one-to-one messaging with Socket.IO
- Display online users in real-time
- Message history for each conversation
- User authentication (login/signup) with JWT
- Responsive UI with sidebar for users
- Seamless integration with backend REST API

---

## Tech Stack

- **Frontend:** React.js (Create React App)
- **State Management:** React Hooks / Context API
- **Styling:** CSS / Tailwind CSS 
- **Realtime:** Socket.IO client
- **HTTP Requests:** Axios 

---

## Getting Started

### Installation

```bash
git clone https://github.com/shabistasaalam/real-time-chat-app-frontend.git
npm install
```

### Environment Variables
* Create a .env file in the root directory:
```VITE_BACKEND_URL='http://localhost:5000' ```

### Run locally
```npm start```
* Opens the app at http://localhost:3000 by default.
* Connects to backend via Socket.IO for real-time chat.

### Folder Structure
frontend/
├── public/              # Public assets
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page views
│   ├── context/         # Context API for state management
│   ├── utils/           # Utility functions (API calls, socket setup)
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── package.json
└── .env
