# AutoFix - Vehicle Complaints & Repair Assistance System

A comprehensive web application that helps car owners track vehicle problems, discover common fixes, and connect with mechanics.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Environment Configuration](#environment-configuration)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Documentation also through Swagger

## Features
🚗 **Vehicle Problem Tracking** - Log and monitor recurring vehicle issues  
🔧 **Repair Solutions Database** - Learn common fixes for problems from tutorials with video player  
👨‍🔧 **Mechanic Connection Portal** - Connect with certified mechanics  
🔐 **Role-Based Access Control** - Different access levels for owners, mechanics, and admins  
📊 **Vehicle Analytics Dashboard** - Insights into common problems and repair trends

## Getting Started

### Prerequisites
- Node.js ≥ 16.0
- MySQL ≥ 8.0
- npm/yarn

### Installation
```
git clone https://github.com/salah-om/autofix.git
cd autofix-api
npm install
```

## **Backend Routes**

### **Authentication**

| Method | Endpoint         | Description           | Status Codes     |
|--------|------------------|-----------------------|------------------|
| POST   | `/auth/login`    | User login            | 200, 400, 401    |
| POST   | `/auth/signup`   | Create new account    | 201, 400         |

---

### **Complaints**

| Method | Endpoint                                  | Description                                        | Status Codes |
|--------|-------------------------------------------|----------------------------------------------------|--------------|
| GET    | `/complaints`                             | Get all complaints                                 | 200          |
| POST   | `/complaints`                             | Submit a complaint                                 | 201, 400     |
| GET    | `/complaints/:make/:model`                | Get complaints for a specific make and model       | 200, 404     |
| GET    | `/complaints/top-worst`                   | Get top 3 most problematic car models              | 200          |

---

### **Vehicles**

| Method | Endpoint                        | Description                             | Status Codes |
|--------|----------------------------------|-----------------------------------------|--------------|
| GET    | `/vehicles`                     | List all vehicles                       | 200          |
| GET    | `/vehicles/makes`              | Get all available car makes             | 200          |
| GET    | `/vehicles/models/:make`       | Get all models for a given make         | 200, 404     |
| POST   | `/vehicles`                    | Add a new vehicle with optional image   | 201, 400     |

---

### Fixes (GraphQL)

| Operation Type | Name              | Description                                | Returns           |
|----------------|-------------------|--------------------------------------------|-------------------|
| Query          | fixes             | Get a list of all fixes                    | [Fix]             |
| Query          | fix(id: ID!)      | Get details of a specific fix              | Fix or null       |
| Mutation       | createFix         | Add a new fix                              | Fix               |
| Mutation       | updateFix         | Update an existing fix                     | Fix               |
| Mutation       | deleteFix         | Delete a fix by ID                         | Boolean           |

---

### **Users**

| Method | Endpoint         | Description                  | Status Codes |
|--------|------------------|------------------------------|--------------|
| GET    | `/users`         | Get all registered users     | 200          |
| PATCH  | `/users/:id`     | Update user profile info     | 200, 400     |
| DELETE | `/users/:id`     | Remove a user from the system| 200, 404     |

---

### **Dashboard Analytics**

| Method | Endpoint                    | Description                           | Status Codes |
|--------|-----------------------------|---------------------------------------|--------------|
| GET    | `/dashboard/adminstats`     | View site-wide admin metrics          | 200          |
| GET    | `/dashboard/mechanicstats`  | View mechanic performance stats       | 200          |

---

### Database Schema

Users
```
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('owner', 'mechanic', 'admin') DEFAULT 'owner'
);
```
Vehicles
```
CREATE TABLE vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year VARCHAR(4),
  imgurl VARCHAR(255)
);
```
Complaints
```
CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  issue VARCHAR(255) NOT NULL,
  description TEXT,
  cost DECIMAL(10,2),
  user_id INT,
  vehicle_id INT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);
```
Fixes
```
CREATE TABLE fixes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  issue VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  videourl VARCHAR(255),
  complaint_id INT UNIQUE,
  FOREIGN KEY (complaint_id) REFERENCES complaints(id)
);
```
Entity Relationships

	•	Users → Complaints: One-to-Many
	•	Vehicles → Complaints: One-to-Many
	•	Complaints → Fixes: One-to-One

### Environment Configuration

Create .env file in root directory:
```
ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=autofix
JWT_SECRET=your_jwt_secret
PORT=3000
```
### Testing
```
bash
npm test
```
### Deployment
The user will be prompted with a login screen upon a successful login the website will detect your rank and take to you to your corresponding inteface.

## Images
![image alt](https://github.com/salah-om/AutoFix/blob/main/login.png?raw=true)
## License
This project is licensed under the [MIT License](LICENSE).
