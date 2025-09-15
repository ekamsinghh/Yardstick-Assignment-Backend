# 📝 Multi-Tenant SaaS Notes Application (Backend)

## Schema Approach
This project uses the shared schema with a tenant ID column approach:

- Every User and Note document stores a tenantId reference.

- This ensures strict data isolation — a tenant’s users and notes cannot be accessed by another tenant.

---

## 🚀 Features
- **Multi-Tenancy** (Acme, Globex) with tenant isolation  
- **JWT-based authentication**  
- **Role-based access control** (Admin vs Member)  
- **Subscription plans** (Free: 3 notes limit, Pro: unlimited notes)  
- **Notes CRUD API** with tenant enforcement  
- **Upgrade subscription endpoint** (Admins only)  
- **Health check endpoint**  

---

## 📦 Tech Stack
- **Node.js + Express.js** – REST API backend  
- **MongoDB Atlas** – Database  
- **JWT** – Authentication  
- **Vercel** – Hosting  

---
## ⚙️ Setup Instructions

### 1. Clone the repository and install dependencies
```bash
npm install
```
## .env File
```bash

PORT=3000
DB_URL=<your-mongodb-atlas-url>
JWT_SECRET=<your-secret-key>

```
## Start the Server
```bash
npm start
```

## API Endpoints
| Method | Endpoint                 | Protected | Description                                      |
| ------ | ------------------------ | --------- | ------------------------------------------------ |
| POST   | `/login`                 | ❌ No      | Login with email and password, returns JWT       |
| POST   | `/notes`                 | ✅ Yes     | Create a new note (tenant limit enforced)        |
| GET    | `/notes`                 | ✅ Yes     | Get all notes for the current tenant             |
| GET    | `/notes/:id`             | ✅ Yes     | Get a specific note by ID                        |
| PUT    | `/notes/:id`             | ✅ Yes     | Update a specific note                           |
| DELETE | `/notes/:id`             | ✅ Yes     | Delete a specific note                           |
| POST   | `/tenants/:slug/upgrade` | ✅ Yes     | Upgrade tenant subscription to Pro (Admins only) |
| GET    | `/health`                | ❌ No      | Health check endpoint                            |
