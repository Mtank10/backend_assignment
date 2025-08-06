#  Backend API

A RESTful API built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL** that manages Users, their Addresses, and associated Geo locations. 
Supports validation with **Zod** and includes full CRUD operations.

---

##  Features

- Create, read, update, delete users
- Each address has a geo-location
- Input validation with Zod
- Pagination support
- Relational deletes (cascade)
- Environment-based configuration

---

##  Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Zod (Validation)
- Postman (for API testing)

---

##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```
## 2. Install Dependencies
```bash
npm install
```
3. Configure .env
Create a .env file in the root:
```bash
DATABASE_URL="postgresql://your_db_user:your_db_password@localhost:5432/your_db_name?schema=public"
PORT=4000
```
 Ensure PostgreSQL is running locally and the database exists.
 
 4. Initialize Prisma
 ```bash
npx prisma migrate dev --name init
npx prisma generate
```
5.  Start the Server
   ```bash
npm run dev
```
Example API Requests (Postman-style)
Create User
POST /api/users
```bash
{
  "name": "Demo",
  "email": "demo@example.com",
  "phone": "9876543210",
  "address": [
    {
      "city": "Mumbai",
      "zipcode": "400001",
      "geo": {
        "lat": "19.0760",
        "lng": "72.8777"
      }
    }
  ]
}
```
Get All Users (with Pagination)
GET /api/users?page=1&limit=10

 Get User by ID
GET /api/users/:id

Update User
PUT /api/users/:id
```bash
{
  "name": "Demo1",
  "email": "demo1@example.com",
  "phone": "9123456789",
  "address": [
    {
      "city": "Pune",
      "zipcode": "411001",
      "geo": {
        "lat": "18.5204",
        "lng": "73.8567"
      }
    }
  ]
}
```

Delete User
DELETE /api/users/:id

This will also delete related addresses and geo locations (cascade delete)


| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/users/all`        | List all users          |
| GET    | `/api/users/:id`        | Get user by ID          |
| POST   | `/api/users`            | Create new user         |
| PUT    | `/api/users/update/:id` | Update user and address |
| DELETE | `/api/users/delete/:id` | Delete user             |

