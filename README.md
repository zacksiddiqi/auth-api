# auth-api

# Auth API

A RESTful authentication API built with Node.js, Express, and MariaDB.
Handles user registration, login, and protected routes using JWT tokens and bcrypt password hashing.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MariaDB (mysql2)
- **Auth:** JSON Web Tokens (jsonwebtoken), bcrypt
- **Environment:** dotenv

## Getting Started

### Prerequisites
- Node.js v18+
- MariaDB

### Installation
1. Clone the repo
```bash
   git clone https://github.com/zacksiddiqi/auth-api.git
   cd auth-api
```
2. Install dependencies
```bash
   npm install
```
3. Copy `.env.example` to `.env` and fill in your credentials
```bash
   cp .env.example .env
```
4. Run the server
```bash
   npm run dev
```

## Endpoints

### Auth
| Method | URL | Description | Auth Required |
|--------|-----|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and receive a JWT token | No |
| GET | `/auth/me` | Get your profile | Yes |

## Usage

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "username": "zack",
  "email": "zack@example.com",
  "password": "password123"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "zack@example.com",
  "password": "password123"
}
```

### Get Profile (Protected)
```http
GET /auth/me
Authorization: Bearer <your_jwt_token>
```

## Environment Variables
See `.env.example` for all required variables:
```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=
DB_PASSWORD=
DB_NAME=auth_db
JWT_SECRET=
```