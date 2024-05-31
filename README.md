# Note Manager Backend

## Overview

The Note Manager Backend is a RESTful API built with Node.js and Express.js. It allows users to manage project notes by providing CRUD (Create, Read, Update, Delete) operations. The project includes features such as user registration with email confirmation, and JWT-based authentication including accessToken and refreshToken management. The application follows a three-layer architecture (Presentation Layer, Business Logic Layer, Data Access Layer) and uses MongoDB as the database.

## Features

- **User Registration and Login**: Users can register and log in to the platform.
- **Email Confirmation**: New users receive an email confirmation through Nodemailer.
- **JWT Authentication**: Secure authentication using access tokens and refresh tokens.
- **CRUD Operations for Notes**: Users can create, read, update, and delete their project notes.
- **Three-Layer Architecture**: Clean separation of concerns with PL, BLL, and DAL.
- **MongoDB**: Utilized as the primary database for storing user and notes data.
- **Swagger Documentation**: API documentation is provided via Swagger.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **JWT (jsonwebtoken)**: For authentication.
- **Nodemailer**: For sending emails.
- **bcrypt**: For hashing passwords.
- **Swagger**: For API documentation.
- **dotenv**: For environment variable management.
- **Jest**: Testing framework.
- **Supertest**: For testing HTTP endpoints.

## Project Structure

- **PL (Presentation Layer)**: Handles HTTP requests and responses.
- **BLL (Business Logic Layer)**: Contains the core business logic.
- **DAL (Data Access Layer)**: Manages database interactions.

## Used Coding Principals
✔️ SOLID
✔️ DRY
✔️ KISS

## License
Please refer to the LICENSE in the repo.

## Questions
If you have any questions find me on [GitHub](https://github.com/oprokopieva382) or feel free email me oprokopieva382@gmail.com