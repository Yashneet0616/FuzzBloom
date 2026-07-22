# 🌸 FuzzBloom

A modern full-stack e-commerce platform built for **FuzzBloom**, a handmade pipe-cleaner flower brand. The application provides customers with a seamless shopping experience while offering administrators a comprehensive dashboard to manage products, orders, and website content.

---

## ✨ Overview

FuzzBloom is designed to support a growing handmade flower business by providing:

- Modern responsive storefront
- Secure customer authentication
- Product catalog management
- Shopping cart & checkout
- Online payment integration
- Order management
- Admin dashboard
- Image management
- Scalable backend architecture

---

# 🚀 Features

## Customer

- Browse products
- Product categories
- Product details
- Shopping cart
- Address management
- Secure checkout
- Razorpay payment integration
- Order confirmation
- Order history
- User profile management
- Responsive design

---

## Admin

- Secure Admin Authentication
- Dashboard Overview
- Product Management
- Add/Edit/Delete Products
- Customer Order Management
- Analytics Dashboard
- Website Settings
- Image Uploads
- Store Management

---

# 🏗 System Architecture

```
                    React + Vite Frontend
                             │
                             │ REST API
                             ▼
                    Express.js Backend
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
       ▼                     ▼                     ▼
 Firebase Auth        Firestore Database     Cloudinary
       │
       ▼
 Razorpay Payment Gateway
```

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Firebase Authentication

## Backend

- Node.js
- Express.js
- Firebase Admin SDK
- Firestore
- Razorpay
- Cloudinary

## Database

- Firebase Firestore

## Authentication

- Firebase Authentication
- Firebase Admin SDK
- JWT Verification

---

# 📂 Project Structure

```
FuzzBloom
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── constants
│   │   ├── context
│   │   ├── firebase
│   │   ├── hooks
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── main.jsx
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Yashneet0616/FuzzBloom.git
cd FuzzBloom
```

Install frontend dependencies

```bash
cd frontend
npm install
```

Install backend dependencies

```bash
cd ../backend
npm install
```

---

# 🔑 Environment Variables

## Frontend (`frontend/.env.local`)

```env
VITE_API_URL=

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_RAZORPAY_KEY_ID=

VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

---

## Backend (`backend/.env`)

```env
PORT=5000

JWT_SECRET=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

# ▶️ Running the Application

Start Backend

```bash
cd backend
npm run dev
```

Start Frontend

```bash
cd frontend
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# 💳 Payment Flow

```
Customer Checkout
        │
        ▼
Create Razorpay Order
        │
        ▼
Customer Payment
        │
        ▼
Payment Verification
        │
        ▼
Store Order in Firestore
        │
        ▼
Generate Order ID
        │
        ▼
Admin Dashboard Update
```

---

# 🔒 Security

The project follows several security practices:

- Environment variables are excluded from version control.
- Firebase Admin credentials remain server-side.
- Authentication is handled through Firebase Authentication.
- Protected backend routes require valid authentication.
- Payment verification is performed server-side.
- Sensitive credentials are never exposed to the frontend.

---

# 📦 Deployment

## Frontend

- Vercel

## Backend

- Render

## Database

- Firebase Firestore

## Image Storage

- Cloudinary

## Payment Gateway

- Razorpay

---

# 📸 Screenshots

> Screenshots will be added after deployment.

- Home Page
- Shop
- Product Details
- Cart
- Checkout
- Admin Dashboard

---

# 👨‍💻 Developer

**Yashneet**

GitHub: https://github.com/Yashneet0616

---

# 📄 License

Copyright © FuzzBloom.

This project was developed for the FuzzBloom brand. Unauthorized copying, modification, distribution, or commercial use without permission is prohibited.