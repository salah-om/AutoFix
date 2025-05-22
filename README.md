# **AutoFix – Vehicle Complaints & Repair Assistance System**

AutoFix is a comprehensive platform designed to assist car owners in tracking vehicle issues, watching repair tutorials, exploring common fixes, and connecting with certified mechanics. It features role-based access control and analytics for a seamless experience for admins, mechanics, and users.

---

## **Features**

- **Vehicle Problem Tracking**: Log and monitor recurring vehicle issues.
- **Top & Bottom Models**: View best-performing and most problematic vehicles based on complaint data.
- **Repair Cost Insights**: Access estimated costs for the most common car problems.
- **Fixes & Video Tutorials**: Find solutions for issues with step-by-step repair guides and integrated video playback.
- **Mechanic Portal**: Contact verified mechanics for consultation and help.
- **Role-Based Access**: Role-specific dashboard and privileges for admins, mechanics, and users.
- **Admin Dashboard**: Analytics and trends on reported problems and fixes.

---

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

### **Fixes** (GraphQL)
| Operation Type | Name           | Description                   | Returns         |
| -------------- | -------------- | ----------------------------- | --------------- |
| Query          | `fixes`        | Get a list of all fixes       | `[Fix]`         |
| Query          | `fix(id: ID!)` | Get details of a specific fix | `Fix` or `null` |
| Mutation       | `createFix`    | Add a new fix                 | `Fix`           |
| Mutation       | `updateFix`    | Update an existing fix        | `Fix`           |
| Mutation       | `deleteFix`    | Delete a fix by ID            | `Boolean`       |

---

### **Users (Admin Only)**

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

Got it! Here's the **fully raw copy-pasteable text starting from the Database Schema**, no code blocks—just raw markdown/plain text:

---

## **Database Schema**

### **Users**

CREATE TABLE users (
id INT(11) AUTO\_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role ENUM('owner', 'mechanic', 'admin') DEFAULT 'owner'
);

---

### **Vehicles**

CREATE TABLE vehicles (
id INT(11) AUTO\_INCREMENT PRIMARY KEY,
make VARCHAR(255) NOT NULL,
model VARCHAR(255) NOT NULL,
year VARCHAR(4),
imgurl VARCHAR(255)
);

---

### **Complaints**

CREATE TABLE complaints (
id INT(11) AUTO\_INCREMENT PRIMARY KEY,
issue VARCHAR(255) NOT NULL,
description TEXT,
cost DECIMAL(10,2),
user\_id INT(11),
vehicle\_id INT(11),
date TIMESTAMP DEFAULT CURRENT\_TIMESTAMP,
FOREIGN KEY (user\_id) REFERENCES users(id),
FOREIGN KEY (vehicle\_id) REFERENCES vehicles(id)
);

---

### **Fixes**

CREATE TABLE fixes (
id INT(11) AUTO\_INCREMENT PRIMARY KEY,
issue VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
videourl VARCHAR(255),
complaint\_id INT(11) UNIQUE,
FOREIGN KEY (complaint\_id) REFERENCES complaints(id)
);

---

### **Relationships**

* **Users → Complaints** (One-to-Many)
* **Vehicles → Complaints** (One-to-Many)
* **Complaints → Fixes** (One-to-One)

---

## **Environment Configuration**

Create a `.env` file in the root directory:

DB\_HOST=localhost
DB\_USER=root
DB\_PASSWORD=yourpassword
DB\_NAME=autofix
JWT\_SECRET=your\_jwt\_secret
PORT=3000

---

## **Testing**

Run tests using:

npm test

---

## **Deployment**

Upon login, the app redirects users based on their role (`owner`, `mechanic`, or `admin`) to their respective dashboards.

---

## **License**

This project is licensed under the MIT License.

---

Let me know if you want the **frontend plan**, **API routes**, or **directory structure** next in the same raw style.
