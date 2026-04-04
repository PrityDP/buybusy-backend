# BuyBusy - E-Commerce Web App

## Overview
BuyBusy is a full-stack e-commerce web application where users can browse products, apply filters, and manage their cart.
It uses **React + Redux Toolkit (Frontend)** and **Node.js + Express + MongoDB (Backend)**.

---
## Features

### Authentication
* User Registration & Login
* Secure login using JWT (cookies)
* Upload profile image

### Products
* View all products
* Search products (with debounce)
* Filter by category and price
* Pagination support

### Cart
* Add to cart
* Remove items
* Update quantity
* Real-time updates

---

## Tech Stack

### Frontend:
* React (Vite)
* Redux Toolkit
* React Router
* Axios

### Backend:
* Node.js
* Express.js
* MongoDB (Mongoose)

---

## Project Structure

Frontend:

* src/components
* src/pages
* src/redux
* src/utils


Backend:
* controllers
* models
* routes
* middlewares
* schemas

---

## Setup Instructions

### 1. Clone Repository
git clone https://github.com/PrityDP/buybusy-backend.git

### 2. Install Dependencies
Frontend:
cd frontend
npm install

Backend:
cd backend
npm install

---

### 3. Setup Environment Variables

Create `.env` file in backend:
PORT=your_backend_port_number
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLIENT_URL=Your Frontned url

Create `.env` file in frontend:
VITE_API_URL=your backend url 

---

### 4. Run Project

Backend:
npm start

Frontend:
npm run dev

---

##  Key Concepts Used

* Redux Toolkit (Slices, Thunks, Store)
* createAsyncThunk for API handling
* createSelector for memoization
* createEntityAdapter for normalized state
* Debounced search for performance optimization
----

## Screenshots


---

## Future Improvements

* Wishlist feature
* Payment integration
* Order history

---

## Author
Priti Shambharkar
