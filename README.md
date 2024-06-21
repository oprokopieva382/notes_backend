# Note Manager Backend

## Overview

The Note Manager Backend is a RESTful API built with Node.js and Express.js. It allows users to manage project notes by providing CRUD (Create, Read, Update, Delete) operations. The project includes features such as user registration with email confirmation, and JWT-based authentication including accessToken and refreshToken management. The application follows a three-layer architecture (Presentation Layer, Business Logic Layer, Data Access Layer) and uses MongoDB as the database.

## Features

- **User Registration through email confirmation and Login**: Users can register and log in to the platform.
- **Email Confirmation**: New users receive an email confirmation through Nodemailer.
- **JWT Authentication**: Secure authentication using access tokens and refresh tokens.
- **CRUD Operations for Notes**: Users can create, read, update, and delete their project notes.
- **Three-Layer Architecture**: Clean separation of concerns with PL, BLL, and DAL.
- **MongoDB**: Utilized as the primary database for storing user and notes data.
- **Swagger Documentation**: API documentation is provided via Swagger.

## Technologies Used

- **JavaScript**.
- **TypeScript**: Typed superset of JavaScript.
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **JWT (jsonwebtoken)**: For authentication.
- **Nodemailer**: For sending emails.
- **bcrypt**: For hashing passwords.
- **Swagger**: For API documentation.
- **dotenv**: For environment variable management.
- **Prometheus**: For measure API performance
- **Jest**: Testing framework.
- **Supertest**: For testing HTTP endpoints.
- **Redis**: For caching user information.
- **Winston**: Logger for logging.

## Project Structure

- **PL (Presentation Layer)**: Handles HTTP requests and responses.
- **BLL (Business Logic Layer)**: Contains the core business logic.
- **DAL (Data Access Layer)**: Manages database interactions.

## Used Coding Principals

✔️ SOLID
✔️ DRY
✔️ KISS

### Prerequisites

- **Node.js** (v18.x or later)
- **Yarn** (v1.22.x or later)
- **Docker** (optional, for running MongoDB and other services in containers)

### Environment Variables

Create a `.env` file in the root of your project and add the necessary environment variables. Below is an example template:

# .env.template

```plaintext
PORT=5000
MONGO_DB_ATLAS=mongodb+srv://<your_username>:<your_password>@<your_cluster-url>/?retryWrites=true&w=majority&appName=<your_appname>
DB_NAME=NOTES
NOTES_COLLECTION=notes
USERS_COLLECTION=users
ADMIN_AUTH=your_username:your_password
REGISTRATION_EMAIL=your_email@example.com
REGISTRATION_PASS=your_passkey (how to get it read here https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer)
API_URL=http://localhost:5000/
JWT_ACCESS_TOKEN_SECRET=your_access_token_secret
JWT_REFRESH_TOKEN_SECRET=your_refresh_token_secret
BLACK_LIST_TOKEN_COLLECTION=tokenBlackList
VERSION=1.0.0
```

### Installation

1. `git clone git@github.com:oprokopieva382/notes_backend.git`
2. `yarn install`
3. In one terminal, run: `yarn watch`
4. In a second terminal, run: `yarn dev`

### Test

run in terminal `yarn test`

## License

Please refer to the LICENSE in the repo.

## Questions

If you have any questions find me on [GitHub](https://github.com/oprokopieva382) or feel free email me oprokopieva382@gmail.com
