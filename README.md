This project extends the Synergia Event Booking API by connecting it to MongoDB instead of using an in-memory array.  
It follows RESTful API standards and supports full CRUD operations with filtering and search functionalities.


1. Connect Node.js and Express API to MongoDB  
2. Perform CRUD operations using Mongoose  
3. Implement filtering and search queries  
4. Validate required fields (name, email, event)  
5. Follow REST API standards with proper status codes  


- Node.js – JavaScript runtime for backend  
- Express.js – Framework for building RESTful APIs  
- MongoDB – NoSQL database for storing bookings  
- Mongoose – ODM for MongoDB  
- Dotenv – For managing environment variables  



 Setup Instructions

 1. Clone the repository

git clone https://github.com/hrithikaaaa/Assignment2.git
cd Assignment2


 2. Install dependencies

npm install


 3. Create a `.env` file
Add the following environment variables (replace with your MongoDB credentials):

PORT=3000
MONGO_URI=mongodb+srv://<your_username>:<your_password>@cluster.mongodb.net/


 4. Run the server

node synergia.js


Expected output:

Synergia Event Booking API is running on port 3000
Connected to MongoDB successfully


 API Endpoints

| No  Method  Endpoint  Description 

 1  GET  `/api/bookings`  Get all bookings 
 2  POST  `/api/bookings`  Create a new booking 
 3  GET  `/api/bookings/:id` Get booking by ID 
 4  PUT  `/api/bookings/:id`  Update booking details 
 5  DELETE  `/api/bookings/:id`  Delete or cancel a booking 
 6  GET  `/api/bookings/search?email=xyz`  Search booking by email 
 7  GET  `/api/bookings/filter?event=Synergia`  Filter bookings by event 


 Booking Schema
js
{
  name: String,
  email: String,
  event: String,
  ticketType: String,
  createdAt: { type: Date, default: Date.now }
}


Required fields: `name`, `email`, and `event`.



 Backend Logic
- The API connects to MongoDB using Mongoose.
- The Booking model defines how booking data is structured in the database.
- CRUD routes interact directly with the MongoDB collection.
- Search and filtering are implemented using query parameters.
- Each route returns proper HTTP responses like 200 OK, 201 Created, 404 Not Found, etc.



 Testing with Postman
You can test all routes using Postman.

 Create Booking
POST `/api/bookings`  
Body (JSON):
json
{
  "name": "Hrithika",
  "email": "hrithika@example.com",
  "event": "Synergia 2025",
  "ticketType": "VIP"
}


 Search Booking
GET `/api/bookings/search?email=hrithika@example.com`

 Filter by Event
GET `/api/bookings/filter?event=Synergia`


 

Ensure environment variables (`MONGO_URI` and `PORT`) are correctly set on the deployment platform.



 Author
Hrithika 
Advanced Backend Development – Assignment 2  
Synergia Event Booking API with MongoDB
