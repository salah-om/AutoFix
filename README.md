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

## Features
🚗 **Vehicle Problem Tracking** - Log and monitor recurring vehicle issues  
🔧 **Repair Solutions Database** - Access common fixes for known problems  
👨‍🔧 **Mechanic Connection Portal** - Connect with certified mechanics  
🔐 **Role-Based Access Control** - Different access levels for owners, mechanics, and admins  
📊 **Vehicle Analytics Dashboard** - Insights into common problems and repair trends

## Getting Started

### Prerequisites
- Node.js ≥ 16.0
- MySQL ≥ 8.0
- npm/yarn

### Installation
```bash
git clone https://github.com/salah-om/autofix.git
cd autofix-api
npm install

### API Documentation

Authentication
Login

POST /auth/login

json
{
  "email": "user@example.com",
  "password": "yourpassword"
}


Signup
POST /auth/signup

json
{
  "username": "newuser",
  "email": "new@example.com",
  "password": "securepassword"
}

### Core Endpoints

Method	Endpoint	Description
GET	/complaints	List all reported problems
POST	/complaints	Submit new vehicle complaint
GET	/vehicles	List all vehicles in system
POST	/fixes		Add new repair solution

Complaints Management

GET /complaints - Get all reported problems
POST /complaints - Submit new vehicle complaint
GET /complaints/:make/:model - Get complaints for specific vehicle
GET /complaints/top-worst - Get top 3 worst car models by complaint volume

Vehicle Information

GET /vehicles/makes - Get all vehicle makes
GET /vehicles/models/:make - Get models for specific make
POST /vehicles - Add new vehicle (supports image upload)

Fixes 

GET /fixes - Get all documented fixes
POST /fixes - Add new repair solution
GET /fixes/:id - Get specific fix details

User Management

GET /users - Get all users (admin only)
PATCH /users/:id - Update user profile
DELETE /users/:id - Delete user account

Dashboard Analytics

GET /dashboard/adminstats - Admin performance metrics
GET /dashboard/mechanicstats - Mechanic workload statistics

### Database Schema

### Core Tables

Users

sql
CREATE TABLE users (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('owner', 'mechanic', 'admin') DEFAULT 'owner'
);

Vehicles

sql
CREATE TABLE vehicles (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year VARCHAR(4),
  imgurl VARCHAR(255)
);

Complaints

sql
CREATE TABLE complaints (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  issue VARCHAR(255) NOT NULL,
  description TEXT,
  cost DECIMAL(10,2),
  user_id INT(11),
  vehicle_id INT(11),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

Fixes

sql
CREATE TABLE fixes (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  issue VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  videourl VARCHAR(255),
  complaint_id INT(11) UNIQUE,
  FOREIGN KEY (complaint_id) REFERENCES complaints(id)
);

Relationships

Users → Complaints (One-to-Many)

Vehicles → Complaints (One-to-Many)

Complaints → Fixes (One-to-One)

### Environment Configuration

Create .env file in root directory:

ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=autofix
JWT_SECRET=your_jwt_secret
PORT=3000

### Testing
bash
npm test

### Deployment
The user will be prompted with a login screen upon a successful login the website will detect your rank and take to you to your corresponding inteface.

## License
This project is licensed under the [MIT License](LICENSE).

