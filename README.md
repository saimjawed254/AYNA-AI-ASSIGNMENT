This full-stack Feedback Collection Platform was built using the MERN stack with a modular, scalable architecture in mind. The backend is organized using clean MVC principles—separating controllers, routes, and middleware for maintainability. I used JWT authentication with a custom middleware to protect private routes. Routes are grouped by resource (/auth, /forms, /responses) and kept stateless with proper token checks. Each feedback form stores an array of flexible question objects (text or MCQ), and responses are stored in a separate collection for efficient querying and analytics.
---
For the frontend, I chose React with Vite for fast build times and used React Context API for global authentication state, enabling consistent token handling across components and protected routes. The form creation interface supports real-time preview, and public form submission is seamless without requiring login. I also implemented Chart.js for hourly and daily insights and added CSV export for raw data access. Separate APIs return response timestamps with form IDs to dynamically compute stats like total responses and recent trends. The layout is fully mobile-responsive, and styles are split cleanly into desktop and mobile CSS files for better control.
---

## 🔑 Demo Admin Account

You can log in with the following prefilled demo account to test features.
It is already filled with 5 forms and more than 20 responses so it will be convenient to check the full functioning of the application:

```
Email: admin1@example.com 
Password: test123
```

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Live Demo](#live-demo)
4. [Folder Structure](#folder-structure)
5. [Setup & Run Locally](#setup--run-locally)

   * [Backend](#backend)
   * [Frontend](#frontend)
6. [Environment Variables](#environment-variables)
7. [API Endpoints](#api-endpoints)
8. [Testing Forms](#testing-forms)
9. [Design Decisions](#design-decisions)
10. [Screenshots](#screenshots)

---

## Features

* **Admin Authentication** (JWT-based)
* **Form Builder** with live preview (text & MCQ questions)
* **Public Form Access** via a shareable `publicId`
* **Response Submission** without login
* **Admin Dashboard**:

  * List all forms
  * View raw responses
  * View Tabular responses
  * Charts (daily & hourly analytics)
  * Export responses as CSV
  * Delete forms & responses
  * Copy shareable link
* **Mobile-responsive UI**
* **404 Page** for undefined routes

---

## Tech Stack

* **Backend:** Node.js, Express, MongoDB (Mongoose)
* **Frontend:** React (Vite), React Router, Axios, Chart.js
* **Authentication:** JWT
* **Deployment:** Render (backend), Vercel (frontend)

---

## Live Demo

* **Frontend:** [https://ayna-ai-assignment.vercel.app](https://ayna-ai-assignment.vercel.app)
* **Backend API:** [https://ayna-ai-assignment.onrender.com/api](https://ayna-ai-assignment.onrender.com/api)

---

## Folder Structure

```
Feedback-Platform/
├── client/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json

├── server/               # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── server.js

├── README.md
└── .gitignore
```

---

## Setup & Run Locally

```bash
Prerequisites
Node.js (v22.17.1)
npm (comes with Node.js)
MongoDB (local or cloud instance)
```

```bash
git clone https://github.com/saimjawed254/AYNA-AI-ASSIGNMENT.git
cd AYNA-AI-ASSIGNMENT
```

### Backend

```bash
cd server
npm install
# Remember to set values in .env. I have sent the envs in the Remarks section of the Submission form
npm run start
```

### Frontend

```bash
cd client
npm install
# Set VITE_API_URL in .env
npm run dev
```

---

## Environment Variables

### server/.env

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### client/.env

```
VITE_API_URL=http://localhost:5000/api
```

---

## API Endpoints

| Method | Endpoint                       | Auth | Description                  |
| ------ | ------------------------------ | ---- | ---------------------------- |
| POST   | `/api/auth/register`           | No   | Register admin               |
| POST   | `/api/auth/login`              | No   | Login admin → returns JWT    |
| GET    | `/api/forms`                   | Yes  | List admin's forms           |
| POST   | `/api/forms`                   | Yes  | Create a new form            |
| DELETE | `/api/forms/:formId`           | Yes  | Delete form + its responses  |
| GET    | `/api/forms/:formId/responses` | Yes  | List responses + summary     |
| GET    | `/api/forms/public/:publicId`  | No   | Public form fetch            |
| POST   | `/api/forms/:publicId/submit`  | No   | Public submit response       |
| GET    | `/api/responses/all-dates`     | Yes  | All response dates + formIds |
| DELETE | `/api/responses/:responseId`   | Yes  | Delete a response            |

---

## Testing Forms

Use these test forms to validate functionality:

1. **Customer Satisfaction Survey**
2. **Course Feedback – Data Structures**
3. **Product Feature Poll**
4. **Daily Team Check-in**

---

## Design Decisions

* **Mongoose Schemas:** Flexible `questions` array for both input & MCQ
* **PublicId:** Uses `nanoid` for short public URLs
* **Form Builder UX:** Real-time preview of the form while building
* **Analytics & Export:** CSV download + Chart.js visualizations
* **Desktop-first CSS + Mobile Responsive Design**: Ensures smooth experience across devices

---

##📸 Screenshots

<img width="1919" height="1018" alt="Screenshot 2025-07-18 021506" src="https://github.com/user-attachments/assets/d1a5e321-00e9-4d96-94f9-7926f3c05d80" />
<img width="1918" height="1010" alt="Screenshot 2025-07-18 122438" src="https://github.com/user-attachments/assets/e0a795a3-6d03-41f8-9539-0c29fe7b3adc" />
<img width="1919" height="1018" alt="Screenshot 2025-07-18 021655" src="https://github.com/user-attachments/assets/18d02ed5-baf4-47a3-955e-4c9fe7753798" />
<img width="1919" height="1011" alt="Screenshot 2025-07-18 122356" src="https://github.com/user-attachments/assets/eb38a62e-9104-4a5e-aadb-77c15301d186" />
<img width="1919" height="1013" alt="Screenshot 2025-07-18 022154" src="https://github.com/user-attachments/assets/a83e98cc-2c9f-4d57-9fcc-18d337abb26c" />

**Mobile Responsive**
  
![WhatsApp Image 2025-07-18 at 02 35 59_2bbc2c2f](https://github.com/user-attachments/assets/54babfed-db0d-46cc-a62e-49731cc356a2)
![WhatsApp Image 2025-07-18 at 12 36 49_04685db4](https://github.com/user-attachments/assets/516ec120-98c0-43c4-929c-f1c5ec8b9025)


---

© 2025 Feedback Platform by **Saim Jawed**
