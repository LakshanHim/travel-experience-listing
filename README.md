Project Overview

The backend of the Travel Experience Listing Platform provides the API services required for the application. 
It handles user authentication, travel listing management, and secure communication with the database. 
The backend allows users to register, log in, and manage travel experience listings through RESTful APIs. 
Authentication is handled using JSON Web Tokens (JWT) to ensure secure access to protected routes.

Tech Stack

Node.js – JavaScript runtime environment
Express.js – Backend framework for building APIs
MongoDB – NoSQL database for storing users and listings
Mongoose – ODM library for MongoDB
JWT (JSON Web Token) – For user authentication
bcryptjs – For hashing user passwords
dotenv – For managing environment variables
CORS – For enabling cross-origin requests

Setup Instructions
1. Clone the repository
git clone https:https://github.com/LakshanHim/travel-experience-listing/tree/main

2. Install dependencies
npm install

4. Create environment variables
Create a .env file in the server folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the backend server
npm run server

The backend will run on:
http://localhost:5000


	Features Implemented
1.	User Authentication
   
  •	User registration API

  •	User login API

  •	JWT token generation

  •	Password hashing using bcrypt

2.	Travel Experience Listings (CRUD)
   
  •	Create a new travel listing
  
  •	Retrieve all listings
  
  •	Retrieve a single listing by ID
  
  •	Update a listing created by the user
  
  •	Delete a listing created by the user

  
3.	Security
   
  •	Protected routes using JWT middleware
  
  •	Only the listing owner can update or delete their listings
  
