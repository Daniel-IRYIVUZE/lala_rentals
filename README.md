# Lala Rentals - Seamless Rental Booking Platform

Welcome to the Lala Rentals project repository! This project is a full-stack web application designed to provide a seamless rental booking experience. The platform allows users to register, log in, and manage property listings and bookings. Hosts can list their properties, while renters can browse and book available properties.

## Technologies Used

- **Frontend**: React Vite JS, Tailwind CSS
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **Authentication**: Google email authentication

## Project Structure

The project is divided into two main directories:

1. **lala-backend**: Contains the backend code built with FastAPI.
2. **lala-frontend**: Contains the frontend code built with React Vite JS and Tailwind CSS.

## Features

### Backend

1. **User Authentication**
   - Google email authentication for user registration and login.
   - Secure login and logout functionality.
   - User roles: Renters and Hosts.
   - User details stored in PostgreSQL.

2. **Property Listing**
   - Hosts can create, update, and delete property listings.
   - Renters can view all available properties on the front page.
   - Each property has:
     - Title
     - Description
     - Price per night
     - Location
     - Host ID

3. **Booking**
   - Renters can book properties by specifying check-in and check-out dates.
   - Properties cannot be double-booked for the same dates.
   - Booking statuses: Pending, Confirmed, Canceled.
   - Secure storage of booking records.

### Frontend

- **Home Page**: A well-designed and visually appealing homepage showcasing available properties.
- **Login and Signup Pages**: User authentication pages.
- **Host Dashboard**: Simple dashboard for hosts to manage their property listings.
- **Renter Dashboard**: Simple dashboard for renters to browse and book properties.

## Installation & Setup

### 1. Clone the Repository
```sh
 [git clone https://github.com/yourusername/lala-rentals.git](https://github.com/Daniel-IRYIVUZE/lala_rentals.git)
 cd lala-rentals
```

### 2. Backend Setup (FastAPI)

#### Install Dependencies
```sh
cd lala-backend
python -m venv venv
source venv/bin/activate  # On Windows use 'venv\Scripts\activate'
pip install -r requirements.txt
```
#### Set Up Environment Variables
- Create a `.env` file in the `lala-backend` folder with the necessary configuration:
  ```env
  DATABASE_URL=<your-database-url>
  GOOGLE_CLIENT_ID=<your-google-client-id>
  GOOGLE_CLIENT_SECRET=<your-google-client-secret>
  SECRET_KEY=<your-secret-key>
  ```

#### Run the Server
```sh
uvicorn main:app --reload
```

---

### 3. Frontend Setup (React Vite JS)

#### Install Dependencies
```sh
cd lala-frontend
npm install
```

#### Run the Frontend
```sh
npm run dev
```

---

## Project Structure
```
📦 lala-rentals
 ┣ 📂 lala-backend  # FastAPI Backend
 ┃ ┣ 📂 models      # Database models
 ┃ ┣ 📂 routes      # API endpoints
 ┃ ┣ 📂 auth        # Google Authentication
 ┃ ┣ 📜 main.py     # Entry point
 ┣ 📂 lala-frontend  # React Frontend
 ┃ ┣ 📂 components  # Reusable UI Components
 ┃ ┣ 📂 pages       # Home, Login, Signup, Dashboards
 ┃ ┣ 📜 App.jsx     # Main App Component
 ┣ 📜 README.md  # Project Documentation
```


### Contact
For any queries, reach out via:
- Email: danieliryivuze4@gmail.com
- Contact: +250 780 162 164
---
