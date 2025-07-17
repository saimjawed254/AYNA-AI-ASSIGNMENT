A full-stack Feedback Collection Platform built with the MERN stack (MongoDB, Express, React, Node.js). Allows businesses (admins) to create customizable feedback forms and customers to submit responses via a public URL.

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
<img width="1919" height="1016" alt="Screenshot 2025-07-18 021624" src="https://github.com/user-attachments/assets/46c157dd-e8f0-4ba9-a219-48785600703b" />
<img width="1919" height="1018" alt="Screenshot 2025-07-18 021655" src="https://github.com/user-attachments/assets/18d02ed5-baf4-47a3-955e-4c9fe7753798" />
<img width="1919" height="1013" alt="Screenshot 2025-07-18 022116" src="https://github.com/user-attachments/assets/82dc2c61-c60b-4efc-bb07-1256d4101fc5" />
<img width="1919" height="1013" alt="Screenshot 2025-07-18 022154" src="https://github.com/user-attachments/assets/a83e98cc-2c9f-4d57-9fcc-18d337abb26c" />

---

© 2025 Feedback Platform by **Saim Jawed**
